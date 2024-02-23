//BACKEND User model
import prisma from "@/app/api/lib/prisma";
import Message from "./Message";

const messagesAndAuthors = {
  messages: {
    include: {
      author: true,
    },
  },
};

export default class Channel {
  constructor({ id, name, createdAt, messages }) {
    this.id = id;
    this.name = name;
    // this.createdAt = createdAt;
    this.messages = messages?.map((message) => new Message(message));
  }

  //Returns all channels without messages data
  static async getAllChannels() {
    let channels;
    try {
      channels = await prisma.channel.findMany();
    } catch (e) {
      throw "primas.channel.findMany failed: " + e;
    }
    return channels ? channels.map((channel) => new Channel(channel)) : null;
  }

  //Returns the channel object if found, otherwise creates a new channel and returns the newly created channel object
  static async findOrCreate({ name }) {
    name = name.toLowerCase().replace(/ /g, "-");
    const foundChannel = await Channel.findByChannelName({ name });
    if (foundChannel) {
      return foundChannel;
    } else {
      return await Channel.create({ name });
    }
  }

  //If successfully found a channel by its name, return the channel object, otherwise return null
  static async findByChannelName({ name }) {
    name = name.toLowerCase().replace(/ /g, "-");
    let channel;
    try {
      channel = await prisma.channel.findUnique({
        where: {
          name: name,
        },
        include: messagesAndAuthors,
      });
    } catch (e) {
      throw "prisma.channel.findUnique by name failed: " + e;
    }
    return channel ? new Channel(channel) : null;
  }

  //If successfully found a channel by its id, return the channel object, otherwise return null
  static async findById({ id }) {
    let channel;
    try {
      channel = await prisma.channel.findUnique({
        where: {
          id: id,
        },
        include: messagesAndAuthors,
      });
    } catch (e) {
      throw "prisma.channel.findUnique by id failed: " + e;
    }
    return channel ? new Channel(channel) : null;
  }

  // If successfully created a channel, return the newly created channel object
  static async create({ name }) {
    let channel;
    try {
      channel = await prisma.channel.create({
        data: {
          name,
        },
        include: messagesAndAuthors,
      });
    } catch (e) {
      throw "primas.channel.create failed: " + e;
    }
    return new Channel(channel);
  }
}
