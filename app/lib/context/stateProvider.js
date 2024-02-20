"use client";

import { pusherClient } from "../pusher/pusherClient";
import ChatContext from "./chatContext";
import { useEffect, useState } from "react";

export default function StateProvider(props) {
  const [user, setUser] = useState("");
  const [currChannel, setCurrChannel] = useState(null);
  const [channels, setChannels] = useState({});
  const [userChannelNames, setUserChannelNames] = useState([]);
  const [joinedChannel, setJoinedChannel] = useState(false);

  // reset state
  function logout() {
    setUser("");
    setCurrChannel(null);
    setChannels({});
    setUserChannelNames([]);
    setJoinedChannel(false);
    for (const name of userChannelNames) {
      const channel = channels[name];
      channel.sub.unbind("client-message");
      pusherClient.unsubscribe(`private-${name}`);
    }
  }

  function joinChannel(channel) {
    const sub = pusherClient.subscribe(`private-${channel.name}`);
    setCurrChannel(channel);
    setChannels((prevState) => ({
      ...prevState,
      [channel.name]: { ...channel, sub },
    }));
    setUserChannelNames((prevState) => [...prevState, channel.name]);
    setJoinedChannel(true);
  }

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

  function sendMessage(message) {
    const channel = channels[currChannel.name];
    if (!channel) return;
    channel.messages.push(message);
    channel.sub.trigger("client-message", message);
    setChannels((prevState) => ({ ...prevState }));
  }

  useEffect(() => {
    if (joinedChannel) {
      const sub = channels[currChannel.name].sub;
      sub.bind("client-message", (message) => {
        const currentChannel = channels[currChannel.name];
        currentChannel.messages.push(message);
        setChannels((prevState) => ({ ...prevState }));
      });
      setJoinedChannel(false);
    }
  }, [currChannel, joinedChannel, channels]);

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
    joinedChannel,
    setJoinedChannel,
    joinChannel,
    sendMessage,
    removeChannel,
  };

  return (
    <ChatContext.Provider value={properties}>
      {props.children}
    </ChatContext.Provider>
  );
}
