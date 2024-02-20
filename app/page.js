"use client";
import Channels from "@/app/components/channelsList";
import Chat from "@/app/components/chat";
import Header from "@/app/components/header";
import UserModal from "@/app/components/userModal";
import ChatContext from "@/app/lib/context/chatContext";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(ChatContext);

  return (
    <div className="chatroom-container">
      <Header />
      {!user && <UserModal />}
      <div className="chat-container-col">
        <div className="chat-container-row">
          <Channels />
          <Chat />
        </div>
      </div>
    </div>
  );
}
