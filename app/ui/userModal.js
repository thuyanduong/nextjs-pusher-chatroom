"use client";

import { useContext, useState } from "react";
import ChatContext from "@/app/lib/context/chatContext";
import { createOrFindUserFetch, getChannelFetch } from "../lib/fetchActions";
import { pusherClient } from "../lib/pusher/pusherClient";

const MAXLENGTH = 320;
const MINLENGTH = 3;

export default function UserModal() {
  const { setUser, setUserChannelNames, setChannels, setCurrChannel } =
    useContext(ChatContext);
  const [emailField, setEmailField] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //grab data about user and channels (just their names, but not their messages)
      const user = await createOrFindUserFetch({ email: emailField });
      if (!user.error) {
        //join membered channels on sign in

        //1. create a new userChannelNames state and fill it with just the names of the user's channels
        const userChannelNames = [];
        //2. create a new channels state and add the object {[channeName]: {id, name, createdAt, pusherChannel}}
        const channels = {};

        let fetchedChannels = Promise.all(
          user.channels.map((channel) => {
            return getChannelFetch({ id: channel.id });
          })
        );

        fetchedChannels.then((channels) => {
          channels.forEach((channel) => {
            userChannelNames.push(channel.name);
            const pusherChannel = pusherClient.subscribe(
              `private-${channel.name}`
            );
            channels[channel.name] = { ...channel, pusherChannel };
            pusherChannel.bind("client-message", (message) => {
              const currentChannel = channels[channel.name];
              currentChannel.messages.push(message);
              setChannels((prevState) => ({ ...prevState }));
            });
          });
          //3. If the user is part of at least one channel, make it the current channel
          let firstChannel = channels[0];
          if (firstChannel) {
            setCurrChannel(channels[firstChannel.name]);
          }
          setUser(user);
          setUserChannelNames(userChannelNames);
          setChannels(channels);
        });
      }
    } catch (e) {
      //TO DO: properly handle error
      throw e;
    }
  }

  function handleChange(e) {
    setEmailField(e.target.value.trim());
  }

  return (
    <div>
      <div className="modal">
        <div className="modal-box">
          <div className="modal-header">
            <h2>Log in with Email</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-content">
              <input
                className="border border-slate-400 rounded-sm p-0.5 w-full"
                placeholder="Email Address"
                onChange={handleChange}
                minLength={MINLENGTH}
                maxLength={MAXLENGTH}
                aria-describedby="username-error"
                value={emailField}
              />
            </div>
            <div className="modal-buttons-container">
              <input
                type="submit"
                className="display-name-button"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="modal-background"></div>
    </div>
  );
}
