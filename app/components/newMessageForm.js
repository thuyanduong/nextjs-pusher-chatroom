"use client";
import {useState, useContext} from 'react'
import ChatContext from '../lib/context/chatContext';

export default function NewMessageForm() {
    const [textInput, setTextInput] = useState("");
    const { sendMessage, user, currChannel } = useContext(ChatContext);

    async function postMessage() {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput, author: user, channelId: currChannel.id }),
      };
      fetch("/api/messages", options)
        .then((response) => response.json())
        .then((message) => {
          sendMessage(message);
          setTextInput("");
        });
    }

    const checkSendMessage = (e) => {
        e.preventDefault();
        if (!textInput.trim()) return;
        try{
          postMessage()
        }catch{
                //TODO: error handling
        }
      };
    
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
