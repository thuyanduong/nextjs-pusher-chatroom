"use client";

export default function Channels() {
  return (
    <div className="channels-container black-border">
      <div className="join-channel-container">
        <input
          className="channel-name-input"
          type="text"
          id="join-channel"
          minLength={4}
          maxLength={32}
          placeholder="Channel to join"
        />
        <button className="join-button">+Join</button>
      </div>

      <div className="channels-list">
        <h6 className="no-channels-joined">
          You haven't joined any channels yet
        </h6>
      </div>
    </div>
  );
}
