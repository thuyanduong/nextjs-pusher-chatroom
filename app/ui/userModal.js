"use client";

import { useContext, useState } from "react";
import ChatContext from "@/app/ui/lib/context/chatContext";
import {
  createOrFindUserFetch,
  getChannelFetch,
  resetNotification,
} from "./lib/fetchActions";
import Channel from "./lib/models/Channel";
import User from "./lib/models/User";
import { subscribeToPusher } from "./lib/pusher/pusherClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function UserModal() {
  const {
    user,
    setUser,
    setChannelOrder,
    setChannels,
    setCurrentChannel,
    handlePusherMessage,
    currentChannel,
  } = useContext(ChatContext);
  const formSchema = z.object({
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit({ email }) {
    try {
      //create or log in as user
      const user = await createOrFindUserFetch({ email });
      //join membered channels on sign in by adding to both channelOrder and channels states
      const channelOrder = [];
      const channels = {};
      user.userChannels.forEach((userChannel) => {
        let channel = new Channel({ ...userChannel, ...userChannel.channel });
        //subscribe to pusher channel
        let pusherChannel = subscribeToPusher(
          user,
          channel,
          currentChannel,
          handlePusherMessage
        );
        channel.pusherChannel = pusherChannel;
        channelOrder.push(channel);
        channels[channel.name] = channel;
      });
      channelOrder.sort((a, b) => a.order - b.order);

      //make an API call to get the first channel's messages if user has a first channel
      if (channelOrder.length > 0) {
        let curChannel = channelOrder[0];
        const fetchedChannel = await getChannelFetch({ id: curChannel.id });
        curChannel.messages = fetchedChannel.messages;
        //update the current channel to the first channel in the user's channelOrder
        setCurrentChannel(curChannel);

        //if the first channel has a notification, reset the notification count
        if (curChannel.notificationCount > 0) {
          //make a fetch call to reset the notification count
          resetNotification({ userId: user.id, channelId: curChannel.id });
          //update the notification count in the UI to 0 and update state
          curChannel.notificationCount = 0;
          setChannels((prevState) => ({ ...prevState }));
        }
      }

      setChannelOrder(channelOrder);
      setChannels(channels);
      setUser(new User(user));

      //make API calls to get all the other channels's messages and add them to state
      if (channelOrder.length > 1) {
        const remainingChannels = channelOrder.slice(1);
        let fetchedChannels = await Promise.all(
          remainingChannels.map((channel) => {
            return getChannelFetch({ id: channel.id });
          })
        );
        fetchedChannels.forEach((channel) => {
          channels[channel.name].messages = channel.messages;
        });
        setChannels((prevState) => ({ ...prevState }));
      }
    } catch (e) {
      setError("root", { message: "Log in Failed" });
    }
  }

  return (
    <div>
      <div className="modal">
        <div className="modal-box">
          <div className="modal-header">
            <h2>Log in with Email</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-content">
              <input
                {...register("email")}
                className="border border-slate-400 rounded-sm p-0.5 w-full"
                placeholder="Email Address"
                aria-describedby="username-error"
              />
              {errors.email && (
                <div id="email-error" className="red-error-message">
                  {errors.email.message}
                </div>
              )}
              {errors.root && (
                <div id="log-in-form-error" className="red-error-message">
                  {errors.root.message}
                </div>
              )}
            </div>
            <div className="modal-buttons-container">
              <input
                disabled={isSubmitting}
                type="submit"
                className="display-name-button"
                value="Log in"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="modal-background"></div>
    </div>
  );
}
