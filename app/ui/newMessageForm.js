import { useState, useContext } from "react";
import ChatContext from "../lib/context/chatContext";
import { postFetchMessage } from "../lib/fetchActions";

export default function NewMessageForm() {
  const [textInput, setTextInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, currChannel, channels, setChannels } = useContext(ChatContext);

  async function checkSendMessage(e) {
    e.preventDefault();
    if (!textInput.trim()) return;
    try {
      // setIsLoading(true);
      const newMessage = await postFetchMessage({
        text: textInput,
        channelId: currChannel.id,
        authorId: user.id,
      });
      // setIsLoading(false);
      const channel = channels[currChannel.name];
      if (!channel) return;
      channel.messages.push(newMessage);
      channel.sub.trigger("client-message", newMessage);
      setChannels((prevState) => ({ ...prevState }));
      setTextInput("");
    } catch {
      //TODO: error handling
    }
  }

  function handleChange(e) {
    if (!isLoading) {
      setTextInput(e.target.value);
    }
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
        disabled={isLoading}
        onChange={handleChange}
        onKeyDown={checkEnterPress}
      />
      <input
        disabled={isLoading}
        type="submit"
        value="Send"
        className="send-button"
      />
    </form>
  );
}
