import prisma from "@/app/lib/prisma";

const messagesObj = {
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
    this.createdAt = createdAt;
    this.messages = messages;
  }

  static async getAllChannels() {
    try {
      return await prisma.channel.findMany();
    } catch (e) {
      //TO DO: Handle error when can't connect to database
      return null;
    }
  }

  static async findOrCreate({ name }) {
    name = name.toLowerCase().replace(/ /g, "-");
    const foundChannel = await Channel.findByChannelName({ name });
    if (foundChannel) {
      return foundChannel;
    } else {
      return await Channel.create({ name });
    }
  }

  static async findByChannelName({ name }) {
    let channel;
    try {
      channel = await prisma.channel.findUnique({
        where: {
          name: name,
        },
        include: messagesObj,
      });
    } catch (e) {
      //TO DO: Handle error when can't connect to database
      return null;
    }
    return channel ? new Channel(channel) : null;
  }

  static async findById({ id }) {
    let channel;
    try {
      channel = await prisma.channel.findUnique({
        where: {
          id: id,
        },
        include: messagesObj,
      });
    } catch (e) {
      //TO DO: Handle error when can't connect to database
      return null;
    }
    return channel ? new Channel(channel) : null;
  }

  static async create({ name }) {
    let channel;
    try {
      channel = await prisma.channel.create({
        data: {
          name,
        },
        include: {
          messages: true,
        },
      });
    } catch (e) {
      //TO DO: Handle error when channel creation fails at the database level
      return null;
    }
    return new Channel(channel);
  }
}
