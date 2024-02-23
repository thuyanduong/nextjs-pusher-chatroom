"use client";

import { useContext, useEffect, useState } from "react";
import ChatContext from "../lib/context/chatContext";
import { pusherClient } from "../lib/pusher/pusherClient";
import { getChannelFetch, leaveChannelFetch } from "../lib/fetchActions";

export default function Channel({ name, id }) {
  const {joinChannel} = useContext(ChatContext);
  const [hasNotification, setHasNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(-2);
  const {
    user,
    currChannel,
    channels,
    setCurrChannel,
    userChannelNames,
    setUserChannelNames,
  } = useContext(ChatContext);

  const channel = channels[name];
  const channelLength = channels[name].messages.length
  const lastMessage =
    channel &&
    channel.messages &&
    channel.messages[channel.messages.length - 1];

  async function removeChannel(name) {
    leaveChannelFetch({ userId: user.id, channelId: id });
    const newChannelNames = userChannelNames.filter((n) => n !== name);
    const channel = channels[name];

    pusherClient.unsubscribe(`private-${name}`);
    channel.pusherChannel.unbind("client-message");
    delete channels[name];

    let curChannel = currChannel;
    //if there are still channels in the UI left
    if (newChannelNames.length > 0) {
      const nameOfNewFirstChannel = newChannelNames[0];
      // if the current channel is the one being removed, set the current channel to the first channel in the list
      if (curChannel.name === name)
        curChannel = channels[nameOfNewFirstChannel];
      if (!channels[nameOfNewFirstChannel].messages) {
        let fetchedChannel = getChannelFetch({
          id: channels[nameOfNewFirstChannel].id,
        });
        let messages = fetchedChannel.messages;
        channels[nameOfNewFirstChannel].messages = messages;
      }
      setCurrChannel(curChannel);
    }
    // const newChannels = { ...channels };
    // setChannels(newChannels);
    setUserChannelNames(newChannelNames);
  }

  function handleRemove(e) {
    e.stopPropagation();
    removeChannel(name);
  }

  function handleSelect() {
    console.log(channels[name].messages)
    // debugger
    if (!channels[name].messages) {
      // debugger
      joinChannel(user.id, channel.name);
    }
    setCurrChannel(channel);
    setHasNotification(false);
    setNotificationCount(0);
  }

  useEffect(() => {
    if (currChannel?.name !== name) {
      setHasNotification(true);
      setNotificationCount((prevState) => prevState + 1);
    }
  }, [lastMessage]);

 

  return (
    <div
      className={`channel ${currChannel?.name === name ? "active" : ""}`}
      onClick={handleSelect}
    >
      <div className="channel-title">
        <h5 className="channel-name">{name}</h5>
        {hasNotification && notificationCount > 0 && (
          <span className="notification">{notificationCount}</span>
        )}
        <div>
          <svg
            className="remove-channel w-6 h-6"
            onClick={handleRemove}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <div className="timestamp">
        Last message:{" "}
        {lastMessage ? new Date(lastMessage.createdAt).toLocaleString() : "N/A"}
      </div>
    </div>
  );
}
