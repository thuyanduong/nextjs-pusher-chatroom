import { useContext, useEffect, useState } from "react";
import ChatContext from "../lib/context/chatContext";

export default function Channel(props) {
  const [hasNotification, setHasNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const { currChannel, channels, removeChannel, setCurrChannel } =
    useContext(ChatContext);
  const { name } = props;

  const channel = channels[name];
  const lastMessage = channel && channel.messages && channel.messages[channel.messages.length - 1];

  function handleRemove(e) {
    e.stopPropagation();
    removeChannel(name);
  }

  function handleSelect() {
    setCurrChannel(channel);
    setHasNotification(false);
    setNotificationCount(0);
  }

  useEffect(() => {
    if (currChannel.name !== name) {
      console.log("last message changed!!!");
      setHasNotification(true);
      setNotificationCount((prevState) => prevState + 1);
    }
  }, [lastMessage]);

  console.log(hasNotification)
  return (
    <div
      className={`channel ${currChannel.name === name ? "active" : ""}`}
      onClick={handleSelect}
    >
      <div className="channel-title">
        <h5 className="channel-name">{name}</h5>
        <div>
          <svg
            className="remove-channel w-6 h-6"
            onClick={handleRemove}
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
      <div className="timestamp">
        Last message:{" "}
        {lastMessage ? new Date(lastMessage.createdAt).toLocaleString() : "N/A"}
        {hasNotification && <span className="notification">{notificationCount}</span>}
      </div>
    </div>
  );
}
