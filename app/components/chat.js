"use client";

import { useContext, useRef, useEffect } from "react";
import ChatContext from "../lib/context/chatContext";
import Message from "./message";
import NewMessageForm from "./newMessageForm";

export default function Chat() {
  const { channels, currChannel } = useContext(ChatContext);
  const channel = channels[currChannel] || [];
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [channels, currChannel]);

  return (
    <div className="messages-container black-border">
      <div className="messages-list">
        {(!channel.messages || channel.messages.length === 0) && (
          <p className="no-new-messages">No new messages since joining...</p>
        )}
        {channel.messages &&
          channel.messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        <div ref={messagesEndRef} />
      </div>
      <NewMessageForm />
    </div>
  );
}
