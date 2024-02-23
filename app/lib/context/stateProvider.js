"use client";

import { getChannelFetch, joinChannelFetch } from "../fetchActions";
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
      channel.pusherChannel.unbind("client-message");
      pusherClient.unsubscribe(`private-${name}`);
    }
  }

  //join a new userchannel from the UI
  async function joinChannel(userId, channelName) {
    let channel = await joinChannelFetch({
      userId,
      channelName: channelName.trim(),
    });

    //Neither the channel data nor it's messages are in the channels state,
    //so add it to both channels and userChannelNames
    if (!channels[channelName]) {
      //use `channel` variable to add to the state
      const pusherChannel = pusherClient.subscribe(`private-${channel.name}`);
      pusherChannel.bind("client-message", (message) => {
        const currentChannel = channels[channel.name];
        currentChannel.messages.push(message);
        setChannels((prevState) => ({ ...prevState }));
      });
      setCurrChannel(channel);
      setChannels((prevState) => ({
        ...prevState,
        [channel.name]: { ...channel, pusherChannel },
      }));
      setUserChannelNames((prevState) => [...prevState, channel.name]);
    }
    //  else {
    //   if (channels[channelName].messages) {
    //     //if this channel data is in the channels state and it's messages are too
    //     setCurrChannel(channels[channel.name]);
    //   } else {
    //     //if this channel data is in the channels state, but not it's messages data
    //     const currentChannel = channels[channel.name];
    //     currentChannel.messages = channel.messages;
    //     setChannels((prevState) => ({ ...prevState }));
    //     setCurrChannel(channels[channelName]);
    //   }
    // }
  }

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
    joinChannel,
  };

  return (
    <ChatContext.Provider value={properties}>
      {props.children}
    </ChatContext.Provider>
  );
}
