export default function Message(props) {
  const { text, author, createdAt } = props.message;
  return (
    <div className="message">
      <div>
        <span className="user-info">{author}</span>{" "}
        <span className="timestamp">
          - {new Date(createdAt).toLocaleString()}
        </span>
      </div>
      <div className="content">{text}</div>
    </div>
  );
}
