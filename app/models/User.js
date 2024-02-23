import prisma from "@/app/lib/prisma";
import Channel from "./Channel";

export default class User {
  constructor({ id, displayName, email, createdAt, updatedAt, channels }) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.channels = channels?.map(
      (userChannel) => new Channel(userChannel.channel)
    );
  }

  static async joinChannel({ userId, channelName }) {
    const channel = await Channel.findOrCreate({ name: channelName });
    try {
      await prisma.userChannel.create({
        data: {
          userId,
          channelId: channel.id,
        },
      });
    } catch (e) {
      //do nothing
    }
    return new Channel(channel);
  }

  static async leaveChannel({ userId, channelId }) {
    try {
      const x = await prisma.userChannel.delete({
        where: {
          userId_channelId:{
            userId,
            channelId
          }
        },
      });
    } catch (e) {
      throw e
    }
    return true;
  }

  static async findOrCreate({ email, password }) {
    email = email.toLowerCase();
    const foundUser = await User.findByEmail({ email });
    if (foundUser) {
      return foundUser;
    } else {
      return await User.create({ email, password });
    }
  }

  static async findByEmail({ email }) {
    let user;
    try {
      user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          channels: {
            include: {
              channel: true,
            },
          },
        },
      });
    } catch (e) {
      //TO DO: Handle error when can't connect to database
      throw e;
    }
    return user ? new User(user) : null;
  }

  static async findById({ id }) {
    let user;
    try {
      user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          channels: {
            include: {
              channel: true,
            },
          },
        },
      });
    } catch (e) {
      //TO DO: Handle error when can't connect to database
      throw e;
    }
    return user ? new User(user) : null;
  }

  static async create({ email, password }) {
    let user;

    let displayName = email.split("@")[0];
    try {
      user = await prisma.user.create({
        data: {
          email,
          displayName,
          password,
        },
      });
      let generalChannel = await Channel.findByChannelName({ name: "general" });
      await prisma.userChannel.create({
        data: {
          userId: user.id,
          channelId: generalChannel.id,
        },
      });
      return User.findByEmail({ email: user.email });
    } catch (e) {
      //TO DO: Handle error when user creation fails at the database level
      throw e;
    }
  }
}
