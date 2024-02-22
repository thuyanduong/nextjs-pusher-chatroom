"use client";

import { useContext, useEffect, useState } from "react";
import ChatContext from "../lib/context/chatContext";
import { pusherClient } from "../lib/pusher/pusherClient";

export default function Channel({name}) {
  const [hasNotification, setHasNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const { currChannel, channels, setCurrChannel, userChannelNames, setChannels, setUserChannelNames } =
    useContext(ChatContext);

  const channel = channels[name];
  const lastMessage = channel && channel.messages && channel.messages[channel.messages.length - 1];

  function removeChannel(name) {
    const newChannels = { ...channels };
    const newChannelNames = userChannelNames.filter((n) => n !== name);
    const channel = newChannels[name];

    channel.sub.unbind("client-message");
    pusherClient.unsubscribe(`private-${name}`);
    delete newChannels[name];

    let curChannel = currChannel;
    if (curChannel.name === name) curChannel = channels[newChannelNames[0]];
    setCurrChannel(curChannel);
    setChannels(newChannels);
    setUserChannelNames(newChannelNames);
  }

  function handleRemove(e) {
    e.stopPropagation();
    removeChannel(name);
  }

  function handleSelect() {
    setCurrChannel(channel);
    setHasNotification(false);
    setNotificationCount(0);
  }

  useEffect(() => {
    if (currChannel.name !== name) {
      setHasNotification(true);
      setNotificationCount((prevState) => prevState + 1);
    }
  }, [lastMessage]);

  return (
    <div
      className={`channel ${currChannel.name === name ? "active" : ""}`}
      onClick={handleSelect}
    >
      <div className="channel-title">
        <h5 className="channel-name">{name}</h5>
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
        {hasNotification && <span className="notification">{notificationCount}</span>}
      </div>
    </div>
  );
}
