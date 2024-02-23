"use client";

import { useState } from "react";
import { unsubscribeFromPusher } from "../pusher/pusherClient";
import ChatContext from "./chatContext";
import { incrementNotification } from "../fetchActions";

export default function StateProvider(props) {
  const [user, setUser] = useState(null);
  const [channelOrder, setChannelOrder] = useState([]);
  const [channels, setChannels] = useState({});
  const [currentChannel, setCurrentChannel] = useState(null);

  // reset state
  function logout() {
    setUser(null);
    setCurrentChannel(null);
    setChannels({});
    setChannelOrder([]);
    for (const name in channels) {
      unsubscribeFromPusher(channels[name]);
    }
  }

  async function handlePusherMessage(
    thisUser,
    thisChannel,
    thisCurrentChannel
  ) {
    //make a fetch call to update notifications
    incrementNotification({ userId: thisUser.id, channelId: thisChannel.id });
    //update the notification count in the UI and update state
    thisChannel.notificationCount += 1;
    setChannels((prevState) => ({ ...prevState }));
  }

  const properties = {
    user,
    setUser,
    channels,
    setChannels,
    channelOrder,
    setChannelOrder,
    currentChannel,
    setCurrentChannel,
    logout,
    handlePusherMessage,
  };

  return (
    <ChatContext.Provider value={properties}>
      {props.children}
    </ChatContext.Provider>
  );
}
