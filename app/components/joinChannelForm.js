"use client";
import { useContext, useState } from "react";
import ChatContext from "../lib/context/chatContext";

export default function JoinChannelForm() {
  const [textInput, setTextInput] = useState("");
  const { joinChannel, channels, setCurrChannel } = useContext(ChatContext);

  async function postChannel(channelName) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: channelName }),
    };
    fetch("/api/channels", options)
      .then((response) => response.json())
      .then((channel) => {
        let {name} = channel
        if (!channels[name]) {
          joinChannel(channel);
        } else {
          setCurrChannel(channels[name]);
        }
        setTextInput("");
      });
  }

  const checkJoin = (e) => {
    e.preventDefault();
    let val = textInput.trim().toLowerCase();
    if (!val) return;
    val = val.replace(/ /g, "-");
    try {
      postChannel(val);
    } catch {
      //TODO: error handling
    }
  };

  function handleChange(e) {
    setTextInput(e.target.value);
  }

  return (
    <form className="join-channel-container" onSubmit={checkJoin}>
      <input
        className="channel-name-input"
        type="text"
        id="join-channel"
        minLength={4}
        maxLength={32}
        placeholder="Channel to join"
        value={textInput}
        onChange={handleChange}
      />
      <input type="submit" className="join-button" value="+Join" />
    </form>
  );
}
