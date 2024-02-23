export default function Message(props) {
  const { text, author, createdAt } = props.message;
  return (
    <div className="message">
      <div>
        <span className="user-info">{author.displayName}</span>{" "}
        <span className="timestamp">
          - {new Date(createdAt).toLocaleString()}
        </span>
      </div>
      <div className="content whitespace-pre-line">{text}</div>
    </div>
  );
}
