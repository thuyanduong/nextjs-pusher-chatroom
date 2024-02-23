"use client";

import ChannelsList from "@/app/ui/channelsList";
import Chat from "@/app/ui/chat";
import Header from "@/app/ui/header";
import UserModal from "@/app/ui/userModal";
import ChatContext from "@/app/lib/context/chatContext";
import { useContext } from "react";
import { joinChannelFetch } from "./lib/fetchActions";
import { pusherClient } from "./lib/pusher/pusherClient";

export default function Home() {
  const { user, channels, setCurrChannel, setChannels, setUserChannelNames } = useContext(ChatContext);

  return (
    <div className="chatroom-container">
      <Header />
      {!user && <UserModal />}
      <div className="chat-container-col">
        <div className="chat-container-row">
          <ChannelsList />
          <Chat />
        </div>
      </div>
    </div>
  );
}
