//BACKEND Message model
import prisma from "@/app/api/lib/prisma";
import User from "./User";

export default class Message {
  constructor({ id, text, channelId, author, createdAt }) {
    this.id = id;
    this.text = text;
    this.channelId = channelId;
    this.createdAt = createdAt;
    this.author = author ? new User(author) : null;
  }

  // If successfully created a message, return the newly created message object
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
      throw "prisma.message.create failed: " + e;
    }
    return new Message(message);
  }
}
