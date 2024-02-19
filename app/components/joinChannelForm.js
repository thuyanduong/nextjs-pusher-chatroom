"use client";
import { useContext, useState } from "react";
import ChatContext from "../lib/context/chatContext";

export default function JoinChannelForm() {
  const [textInput, setTextInput] = useState("");
  const {joinChannel, channels, setCurrChannel} = useContext(ChatContext)

  const checkJoin = (e) => {
    e.preventDefault()
    let val = textInput.trim().toLowerCase()
    if (!val) return
    val = val.replace(/ /g, '-')

    if (!channels[val]) {
      joinChannel(val)
    }else{
      setCurrChannel(val)
    }
    setTextInput("")
  }

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
