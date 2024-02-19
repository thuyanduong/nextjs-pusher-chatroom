import ChatContext from "@/app/lib/context/chatContext";
import { useContext, useEffect, useRef, useState } from "react";
import Channel from "./channel";
import JoinChannelForm from "./joinChannelForm";

export default function Channels() {
  const [isLoading, setIsLoading] = useState(false)
  const { user, channels, logout, userChannelNames, joinChannel, currChannel } =
    useContext(ChatContext);
  const channelsEndRef = useRef(null);

  // Auto-join general channel when username is set
  useEffect(() => {
    if (user && !channels.general) {
      postChannel("general");
    }
  }, [user]);

  async function postChannel(channelName) {
    setIsLoading(true)
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
        setIsLoading(false)
        let { name } = channel;
        if (!channels[name]) {
          joinChannel(channel);
        } else {
          setCurrChannel(name);
        }
      });
  }

  useEffect(() => {
    scrollToBottom();
  }, [userChannelNames]);

  const scrollToBottom = () => {
    channelsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="channels-container black-border">
      <div>
        <JoinChannelForm />
      </div>

      <div className="channels-list">
        {userChannelNames.length === 0 ? (
          <h6 className="no-channels-joined">
            {isLoading ? "Loading..." : "You haven't joined any channels yet"}
          </h6>
        ) : (
          userChannelNames.map((name) => <Channel name={name} key={name} />)
        )}
        <div ref={channelsEndRef} />
      </div>
      {user && (
        <div className="user-status">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <div className="username">{user}</div>
          <button className="exit-button" onClick={logout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Leave
          </button>
        </div>
      )}
    </div>
  );
}
