export default class Message {
  constructor({ id, text, channelId, author, createdAt }) {
    this.id = id;
    this.text = text;
    this.channelId = channelId;
    this.author = author;
    this.createdAt = createdAt;
  }

  static async create({ text, channelId, authorId }) {
    let message;
    console.log({text, channelId, authorId})
    try {
      message = await prisma.message.create({
        data: {
          text,
          channelId,
          authorId,
        }, include: {
          author: true
        }
      });
      console.log({message})
    } catch (e) {
      //TO DO: Handle error when message creation fails at the database level
      return null;
    }
    return new Message(message);
  }
}
