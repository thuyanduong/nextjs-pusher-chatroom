"use client";

import { useContext, useRef, useEffect } from "react";
import Message from "./message";
import NewMessageForm from "./newMessageForm";
import ChatContext from "./lib/context/chatContext";

export default function Chat() {
  const { currentChannel, channels } = useContext(ChatContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChannel, channels]);

  //If there is no current channel, display nothing
  //If there is a current channel but no messages, display "No messages..."
  //Otherwise, display the messages
  function renderChat() {
    if (currentChannel && currentChannel.messages) {
      if (currentChannel.messages.length > 0) {
        return currentChannel.messages.map((message, index) => (
          <Message key={index} message={message} />
        ));
      } else {
        return <p className="no-new-messages">No messages...</p>;
      }
    } else {
      return null;
    }
  }

  return (
    <div className="messages-container black-border">
      <div className="messages-list">
        {renderChat()}
        <div ref={messagesEndRef} />
      </div>
      <NewMessageForm />
    </div>
  );
}
