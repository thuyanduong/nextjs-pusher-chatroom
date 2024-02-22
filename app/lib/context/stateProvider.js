"use client";

import { pusherClient } from "../pusher/pusherClient";
import ChatContext from "./chatContext";
import { useEffect, useState } from "react";

export default function StateProvider(props) {
  const [user, setUser] = useState(null);
  const [currChannel, setCurrChannel] = useState(null);
  const [channels, setChannels] = useState({});
  const [userChannelNames, setUserChannelNames] = useState([]);

  // reset state
  function logout() {
    setUser(null);
    setCurrChannel(null);
    setChannels({});
    setUserChannelNames([]);
    for (const name of userChannelNames) {
      const channel = channels[name];
      channel.sub.unbind("client-message");
      pusherClient.unsubscribe(`private-${name}`);
    }
  }

  useEffect(() => {
    if (currChannel) {
      const sub = channels[currChannel.name].sub;
      sub.bind("client-message", (message) => {
        const currentChannel = channels[currChannel.name];
        currentChannel.messages.push(message);
        setChannels((prevState) => ({ ...prevState }));
      });
    }
  }, [currChannel]);

  const properties = {
    user,
    setUser,
    logout,
    channels,
    setChannels,
    userChannelNames,
    setUserChannelNames,
    currChannel,
    setCurrChannel,
  };

  return (
    <ChatContext.Provider value={properties}>
      {props.children}
    </ChatContext.Provider>
  );
}
