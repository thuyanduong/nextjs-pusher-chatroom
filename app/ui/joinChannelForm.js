"use client";

import { useContext, useState } from "react";
import ChatContext from "./lib/context/chatContext";
import Channel from "./lib/models/Channel";
import { set } from "react-hook-form";
import { joinChannelFetch } from "./lib/fetchActions";
import { subscribeToPusher } from "./lib/pusher/pusherClient";

const MAXLENGTH = 25;
const MINLENGTH = 4;

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
  const [textInput, setTextInput] = useState("");
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setTextInput(e.target.value.trim());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let errors = {};
    if (!textInput) {
      errors.channelNameError = "Channel name is required.";
    } else if (textInput.length > MAXLENGTH || textInput.length < MINLENGTH) {
      errors.channelNameError = `Channel name must be between ${MINLENGTH} and ${MAXLENGTH} characters.`;
    }
    //If there are no form validation errors, join the channel
    if (Object.keys(errors).length === 0) {
      //fetch to create or find channel and its messages
      let userChannel = await joinChannelFetch({
        userId: user.id,
        channelName: textInput,
      });
      //user was not in channel, just joined
      if(userChannel){
        let channel = new Channel({ ...userChannel, ...userChannel.channel });
        //subscribe to pusher channel
        let pusherChannel = subscribeToPusher(user, channel, currentChannel, handlePusherMessage);
        channel.pusherChannel = pusherChannel;
        //join channels on submit by adding to both channelOrder and channels states
        channelOrder.push(channel);
        channels[channel.name] = channel;
        //update the current channel to the newly joined channel
        setCurrentChannel(channel);
        setChannels({ ...channels });
        setChannelOrder([...channelOrder]);
      }else{
        setCurrentChannel(channels[textInput]);
      }
      setTextInput("");
    } else {
      setErrors(errors);
    }
  }

  return (
    <>
      <form className="join-channel-container" onSubmit={handleSubmit}>
        <input
          className="channel-name-input"
          type="text"
          id="join-channel"
          minLength={MINLENGTH}
          maxLength={MAXLENGTH}
          placeholder="Channel to join"
          value={textInput}
          onChange={handleChange}
        />
        <input type="submit" className="join-button" value="+Join" />
      </form>
      <div id="username-error" aria-live="polite" aria-atomic="true">
        {errors.channelNameError && (
          <p className="red-error-message">{errors.channelNameError}</p>
        )}
      </div>
    </>
  );
}
