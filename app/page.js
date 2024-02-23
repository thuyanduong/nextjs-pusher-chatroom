"use client";
import ChannelsList from "@/app/ui/channelsList";
import Chat from "@/app/ui/chat";
import Header from "@/app/ui/header";
import UserModal from "@/app/ui/userModal";
import { useContext } from "react";
import ChatContext from "./ui/lib/context/chatContext";

export default function Home() {
  const { user } = useContext(ChatContext);

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
