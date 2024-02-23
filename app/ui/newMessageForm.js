"use client";

import { useState, useContext } from "react";
import ChatContext from "./lib/context/chatContext";
import { createMessageFetch } from "./lib/fetchActions";
import { sendPusherMessage } from "./lib/pusher/pusherClient";

export default function NewMessageForm() {
  const [textInput, setTextInput] = useState("");
  const { currentChannel, user, channels, setChannels } =
    useContext(ChatContext);

  async function sendMessage(e) {
    e.preventDefault();
    if (!textInput.trim()) return;
    // make a fetch request to create a new message
    const newMessage = await createMessageFetch({
      text: textInput,
      channelId: currentChannel.id,
      authorId: user.id,
    });
    // add the new message to the channels state
    const channel = channels[currentChannel.name];
    channel.messages.push(newMessage);
    // update the channels state
    setChannels((prevState) => ({ ...prevState }));
    // trigger the pusher channel to send the new message
    sendPusherMessage(channel, newMessage);
    //reset the text input
    setTextInput("");
  }

  function handleChange(e) {
    setTextInput(e.target.value);
  }

  function checkEnterPress(e) {
    if (e.keyCode == 13 && e.shiftKey == false) {
      sendMessage(e);
    }
  }

  return (
    <form className="new-message-container" onSubmit={sendMessage}>
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
