"use client";
import Channels from "@/components/Channels";
import Chat from "@/components/Chat";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="chatroom-container">
      <Header />
      <div className="chat-container">
        <Channels />
        <Chat />
      </div>
    </div>
  );
}
