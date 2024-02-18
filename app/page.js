"use client";
import Channels from "@/app/components/channelsList";
import Chat from "@/app/components/chat";
import Header from "@/app/components/header";
import UserModal from "@/app/components/userModal";
import ChatContext from "@/app/lib/context/chatContext";
import { useContext } from "react";

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", (e) => {
    e.returnValue = "Are you sure you want to leave? You will lose your state";
  });
}

export default function Home() {
  const { user } = useContext(ChatContext);

  return (
    <div className="chatroom-container">
      <Header />
      {!user && <UserModal />}
      <div className="chat-container">
        <Channels />
        <Chat />
      </div>
    </div>
  );
}
