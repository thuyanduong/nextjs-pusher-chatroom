//BACKEND User model
import prisma from "@/app/api/lib/prisma";
import Channel from "./Channel";
import UserChannel from "./UserChannel";

const userChannelsAndChannels = {
  channels: {
    include: {
      channel: true,
    },
  },
};

export default class User {
  constructor({ id, displayName, email, createdAt, updatedAt, channels }) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    // this.createdAt = createdAt;
    // this.updatedAt = updatedAt;
    this.userChannels = channels?.map(
      (userChannel) => new UserChannel({ ...userChannel, user: this })
    );
  }

  //If successfully joined a channel, return the newly created userChannel object
  //If user was already in the channel, return false
  static async joinChannel({ userId, channelName }) {
    const channel = await Channel.findOrCreate({ name: channelName });
    const userChannel = await UserChannel.create({
      userId,
      channelId: channel.id,
    });
    return userChannel ? new UserChannel(userChannel) : false;
  }

  //If successfully left a channel, return true
  static async leaveChannel({ userId, channelId }) {
    return UserChannel.delete({ userId, channelId });
  }

  //return the user object and userChannels
  static async findOrCreate({ email, password }) {
    email = email.toLowerCase();
    const foundUser = await User.findByEmail({ email });
    if (foundUser) {
      return foundUser;
    } else {
      return await User.create({ email, password });
    }
  }

  //If successfully found a user by email, return the user object and userChannels, otherwise return null
  static async findByEmail({ email }) {
    email = email.toLowerCase();
    let user;
    try {
      user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: userChannelsAndChannels,
      });
    } catch (e) {
      throw "prisma.user.findUnique failed: " + e;
    }
    return user ? new User(user) : null;
  }

  //If successfully found a user by id, return the user object and userChannels, otherwise return null
  static async findById({ id }) {
    let user;
    try {
      user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: userChannelsAndChannels,
      });
    } catch (e) {
      throw "prisma.user.findUnique failed: " + e;
    }
    return user ? new User(user) : null;
  }

  //If successfully created a user, return the user object and userChannels
  static async create({ email, password }) {
    //Create the user object
    let displayName = email.split("@")[0];
    let user;
    try {
      user = await prisma.user.create({
        data: {
          email,
          displayName,
          password,
        },
        include: userChannelsAndChannels,
      });
    } catch (e) {
      throw "prisma.user.create failed: " + e;
    }
    //Add the user to the general channel
    await User.joinChannel({ userId: user.id, channelName: "general" });
    //Return the user object and userChannels using a different class method
    return User.findByEmail({ email: user.email });
  }
}
