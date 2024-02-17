"use client";

const maxLength = 256;
export default function Chat() {
  return (
    <div className="messages-container black-border">
      <div className="messages-list">
        <p className="no-new-messages">No new messages since joining...</p>
      </div>
      <div className="new-message-container">
        <textarea
          className="new-message-input"
          id="new-message"
          maxLength={maxLength}
          placeholder="Your message..."
        />
        <button className="send-button">Send</button>
      </div>
    </div>
  );
}
