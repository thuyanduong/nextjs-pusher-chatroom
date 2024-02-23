//FRONTEND Message model
import User from "./User";

export default class Message {
  constructor({ id, text, createdAt, author }) {
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.author = new User(author);
  }
}
