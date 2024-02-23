import prisma from "@/app/api/lib/prisma";
import User from "./User";
import Channel from "./Channel";

const channelWithMessages = {
  channel: {
    include: {
      messages: {
        include: {
          author: true,
        },
      },
    },
  },
};

export default class UserChannel {
  constructor({ userId, channelId, notificationCount, order, user, channel }) {
    this.userId = userId;
    this.channelId = channelId;
    this.notificationCount = notificationCount;
    this.order = order;
    // this.user = user ? new User(user) : null;
    this.channel = channel ? new Channel(channel) : null;
  }

  // If successfully added a user to a channel, return the newly created userChannel object
  // Insert the order as expected
  // If user was already in the channel, return false
  static async create({ userId, channelId }) {
    let user, userChannel;
    user = await User.findById({ id: userId });
    let nextIndex =
      user.userChannels.reduce((acc, userChannel) => {
        return Math.max(acc, userChannel.order);
      }, 0) + 1;
    try {
      userChannel = await prisma.userChannel.create({
        data: {
          userId,
          channelId,
          order: nextIndex,
        },
        include: channelWithMessages,
      });
    } catch (e) {
      if (e.code === "P2002") {
        return false;
      }
      throw "prisma.userChannel.create failed: " + e;
    }
    return userChannel ? new UserChannel(userChannel) : null;
  }

  // If successfully removed a user from a channel, return true
  static async delete({ userId, channelId }) {
    try {
      await prisma.userChannel.delete({
        where: {
          userId_channelId: {
            userId,
            channelId,
          },
        },
      });
    } catch (e) {
      throw "prisma.userChannel.delete failed: " + e;
    }
    return true;
  }

  // If successfully incremented the notification count for a user in a channel, return the new notification count
  static async incrementNotification({ userId, channelId }) {
    let newCount;
    try {
      newCount = await prisma.userChannel.update({
        where: {
          userId_channelId: {
            userId,
            channelId,
          },
        },
        data: {
          notificationCount: {
            increment: 1,
          },
        },
      });
    } catch (e) {
      throw (
        "prisma.userChannel.update increment notificationCount failed: " + e
      );
    }
    return newCount;
  }

  // If successfully reset the notification count to 0, return true
  static async resetNotification({ userId, channelId }) {
    try {
      await prisma.userChannel.update({
        where: {
          userId_channelId: {
            userId,
            channelId,
          },
        },
        data: {
          notificationCount: 0,
        },
      });
    } catch (e) {
      throw "prisma.userChannel.update notificationCount to 0 failed: " + e;
    }
    return true;
  }
}
