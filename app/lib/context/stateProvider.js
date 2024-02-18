"use client";

import { pusherClient } from "../pusher/pusherClient";
import ChatContext from "./chatContext";
import { useEffect, useState } from "react";

export default function StateProvider(props) {
  const [user, setUser] = useState("");
  const [currChannel, setCurrChannel] = useState(null);
  const [channels, setChannels] = useState({});
  const [channelNames, setChannelNames] = useState([]);
  const [joinedChannel, setJoinedChannel] = useState(false);

  // reset state
  function logout() {
    setUser("");
    setCurrChannel(null);
    setChannels({});
    setChannelNames([]);
    for (const name of channelNames) {
      const channel = channels[name];
      channel.sub.unbind("client-message");
      pusherClient.unsubscribe(`private-${name}`);
    }
  }

  function joinChannel(channelName) {
    console.log("joining channel:", channelName);
    const sub = pusherClient.subscribe(`private-${channelName}`);
    setCurrChannel(channelName);
    setChannels(prevState => ({...prevState,[channelName]: { messages: [], sub },}));
    setChannelNames(prevState => [...prevState, channelName]);
    setJoinedChannel(true)
  }

  function removeChannel(name) {
    const newChannels = { ...channels };
    const newChannelNames = channelNames.filter((n) => n !== name);
    const channel = newChannels[name];

    channel.sub.unbind("client-message");
    pusherClient.unsubscribe(`private-${name}`);
    delete newChannels[name];

    let curChannel = currChannel;
    if (curChannel === name) curChannel = newChannelNames[0];
    setCurrChannel(curChannel);
    setChannels(newChannels);
    setChannelNames(newChannelNames);
  }

  function sendMessage(text) {
    console.log("sent message:", text, "to channel: ", currChannel);
    const channel = channels[currChannel];
    if (!channel) return;
    const message = {
      text,
      user,
      sent: new Date().getTime(),
    };
    channel.messages.push(message);
    channel.sub.trigger("client-message", message);
    setChannels((prevState) => ({ ...prevState }));
  }

  useEffect(() => {
    if(joinedChannel){
      console.log("joined channel:", currChannel);
      const sub = channels[currChannel].sub
      // const sub = pusherClient.subscribe(`private-${currChannel}`);
      sub.bind("client-message", (message) => {
        const currentChannel = channels[currChannel];
        currentChannel.messages.push(message);
        setChannels((prevState) => ({ ...prevState }));
      });
      setJoinedChannel(false)
    }
  },[currChannel])

  const properties = {
    user,
    setUser,
    logout,
    channels,
    setChannels,
    channelNames,
    setChannelNames,
    currChannel,
    setCurrChannel,
    joinedChannel,
    setJoinedChannel,
    joinChannel,
    sendMessage,
    removeChannel
  };

  return (
    <ChatContext.Provider value={properties}>
      {props.children}
    </ChatContext.Provider>
  );
}
