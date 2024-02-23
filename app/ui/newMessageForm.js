"use client";

import { useState, useContext } from "react";
import ChatContext from "../lib/context/chatContext";
import { createMessageFetch } from "../lib/fetchActions";

export default function NewMessageForm() {
  const [textInput, setTextInput] = useState("");
  const { user, currChannel, channels, setChannels } = useContext(ChatContext);

  async function checkSendMessage(e) {
    e.preventDefault();
    if (!textInput.trim()) return;
    try {
      const newMessage = await createMessageFetch({
        text: textInput,
        channelId: currChannel.id,
        authorId: user.id,
      });
      const channel = channels[currChannel.name];
      setTextInput("");
      setChannels((prevState) => ({ ...prevState }));
      channel.messages.push(newMessage);
      channel.pusherChannel.trigger("client-message", newMessage);
    } catch {
      //TODO: error handling
    }
  }

  function handleChange(e) {
    setTextInput(e.target.value);
  }

  function checkEnterPress(e) {
    if (e.keyCode == 13 && e.shiftKey == false) {
      checkSendMessage(e);
    }
  }

  return (
    <form className="new-message-container" onSubmit={checkSendMessage}>
      <textarea
        className="new-message-input"
        id="new-message"
        placeholder="Your message..."
        value={textInput}
        onChange={handleChange}
        onKeyDown={checkEnterPress}
      />
      <input type="submit" value="Send" className="send-button" />
    </form>
  );
}
