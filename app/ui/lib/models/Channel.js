//FRONTEND Channel model
export default class Channel {
  constructor({
    id,
    name,
    createdAt,
    messages,
    notificationCount,
    order,
    pusherChannel,
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.notificationCount = notificationCount;
    this.order = order;
    this.messages = messages;
    this.pusherChannel = pusherChannel;
  }
}
