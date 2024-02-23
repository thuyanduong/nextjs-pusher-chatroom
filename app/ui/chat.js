"use client"

import { useContext, useRef, useEffect } from "react";
import ChatContext from "../lib/context/chatContext";
import Message from "./message";
import NewMessageForm from "./newMessageForm";

export default function Chat() {
  const { currChannel, channels } = useContext(ChatContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currChannel, channels]);

  return (
    <div className="messages-container black-border">
      <div className="messages-list">
        {currChannel &&
          currChannel.messages &&
          currChannel.messages.length === 0 && (
            <p className="no-new-messages">No messages...</p>
          )}
        {currChannel &&
          currChannel.messages &&
          currChannel.messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        <div ref={messagesEndRef} />
      </div>
      <NewMessageForm />
    </div>
  );
}
