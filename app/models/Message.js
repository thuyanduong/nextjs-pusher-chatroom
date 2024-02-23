import prisma from "@/app/lib/prisma";
import User from "./User";

export default class Message {
  constructor({ id, text, channelId, author, createdAt }) {
    this.id = id;
    this.text = text;
    this.channelId = channelId;
    this.createdAt = createdAt;
    this.author = author? new User(author) : null;
  }

  static async create({ text, channelId, authorId }) {
    let message;
    try {
      message = await prisma.message.create({
        data: {
          text,
          channelId,
          authorId,
        },
        include: {
          author: true,
        },
      });
    } catch (e) {
      //TO DO: Handle error when message creation fails at the database level
      throw e
    }
    return new Message(message);
  }
}
