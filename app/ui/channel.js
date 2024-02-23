"use client";

import { useContext } from "react";
import ChatContext from "./lib/context/chatContext";
import { leaveChannelFetch, resetNotification } from "./lib/fetchActions";
import { unsubscribeFromPusher } from "./lib/pusher/pusherClient";

export default function Channel({ channel }) {
  const { name, id, notificationCount } = channel;
  const { user, channels, channelOrder, currentChannel, setCurrentChannel, setChannels, setChannelOrder } =
    useContext(ChatContext);

  const lastMessage =
    channel &&
    channel.messages &&
    channel.messages[channel.messages.length - 1];

  async function removeChannel() {
    //make a fetch call to leave the channel
    leaveChannelFetch({ userId: user.id, channelId: id });
    //unsubscribe from the pusher channel
    unsubscribeFromPusher(channel)
    //remove the channel from the state for both channels and channelOrder
    let newChannels = { ...channels };
    delete newChannels[name]
    setChannels(newChannels);
    let newChannelOrder = channelOrder.filter((channel) => channel.id !== id);
    setChannelOrder(newChannelOrder);
    //if the channel being removed is the currentChannel, set the current channel to the first channel in the list
    if(currentChannel.id === id) {
      setCurrentChannel(newChannelOrder[0]);
    }
  }

  function handleRemove(e) {
    e.stopPropagation();
    removeChannel();
  }

  function handleSelect() {
    //make a fetch call to reset the notification count
    resetNotification({ userId: user.id, channelId: id });
    //update the notification count in the UI to 0 and update state
    channel.notificationCount = 0;
    setChannels((prevState) => ({ ...prevState }));
    //update the current channel to the clicked on channel
    setCurrentChannel(channel);
  }

  return (
    <div
      className={`channel ${currentChannel?.name === name ? "active" : ""}`}
      onClick={handleSelect}
    >
      <div className="channel-title">
        <h5 className="channel-name">{name}</h5>
        {!!notificationCount && (
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
