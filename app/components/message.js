"use client";

export default function Message(props) {
  const { text, user, sent } = props.message;
  return (
    <div className="message">
      <div>
        <span className="user-info">{user}</span> <span className="timestamp">- {new Date(sent).toLocaleString()}</span>
      </div>
      <div className="content">{text}</div>
    </div>
  );
}
