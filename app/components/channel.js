import { useContext, useEffect } from "react";
import ChatContext from "../lib/context/chatContext";

export default function Channel(props) {
  const { currChannel, channels, removeChannel, setCurrChannel } =
    useContext(ChatContext);
  const { name } = props;

  const channel = channels[name];
  const lastMessage = channel && channel.messages[channel.messages.length - 1];

  function handleRemove(e) {
    e.stopPropagation();
    removeChannel(name);
  }

  useEffect(() => {
  }, [currChannel]);

  return (
    <div
      className={`channel ${currChannel.name === name ? "active" : ""}`}
      onClick={() => {
        setCurrChannel(channel);
      }}
    >
      <div className="channel-title">
        <h5 className="channel-name">{name}</h5>
        <div >
          <svg className="remove-channel w-6 h-6" onClick={handleRemove}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <span className="timestamp">
        Last message:{" "}
        {lastMessage ? new Date(lastMessage.createdAt).toLocaleString() : "N/A"}
      </span>
    </div>
  );
}
