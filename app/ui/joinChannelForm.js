"use client";

import { useContext, useState } from "react";
import ChatContext from "./lib/context/chatContext";
import Channel from "./lib/models/Channel";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinChannelFetch } from "./lib/fetchActions";
import { subscribeToPusher } from "./lib/pusher/pusherClient";

export default function JoinChannelForm() {
  const {
    user,
    channels,
    channelOrder,
    setChannels,
    currentChannel,
    setCurrentChannel,
    setChannelOrder,
    handlePusherMessage,
  } = useContext(ChatContext);

  const formSchema = z.object({
    channelName: z
      .string()
      .min(4, {
        message: "Channel name must be at least 4 characters",
      })
      .max(30, {
        message: "Channel name must be at 30 characters or less",
      })
      .regex(/^[A-Za-z0-9-\s]+$/, {
        message:
          "Channel name can only include letters, numbers, spaces, and dashes",
      })
      .toLowerCase(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    reValidateMode: "onSubmit"
  });

  async function joinChannel({ channelName }) {
    channelName = channelName.trim().replace(/\s/g, "-");
    if (!channels[channelName]) {
      //fetch to create or find channel and its messages
      let userChannel = await joinChannelFetch({
        userId: user.id,
        channelName,
      });
      //user was not in channel, just joined
      let channel = new Channel({ ...userChannel, ...userChannel.channel });
      //subscribe to pusher channel
      let pusherChannel = subscribeToPusher(
        user,
        channel,
        currentChannel,
        handlePusherMessage
      );
      channel.pusherChannel = pusherChannel;
      //join channels on submit by adding to both channelOrder and channels states
      channelOrder.push(channel);
      channels[channel.name] = channel;
      //update the current channel to the newly joined channel
      setCurrentChannel(channel);
      setChannels({ ...channels });
      setChannelOrder([...channelOrder]);
    } else {
      setCurrentChannel(channels[channelName]);
    }
    // debugger
    reset();
  }

  return (
    <>
      <form
        className="join-channel-container"
        onSubmit={handleSubmit(joinChannel)}
      >
        <input
          {...register("channelName")}
          className="channel-name-input"
          type="text"
          id="join-channel"
          placeholder="Channel to join"
        />
        <input
          disabled={isSubmitting}
          type="submit"
          className="join-button"
          value="+Join"
        />
      </form>
      {errors.channelName && (
        <div id="email-error" className="red-error-message">
          {errors.channelName.message}
        </div>
      )}
    </>
  );
}
