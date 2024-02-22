import prisma from "@/app/lib/prisma";

export default class User {
  constructor({ id, username, email, createdAt, updatedAt }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async findOrCreate({ username, email, password }) {
    const foundUser = await User.findByUsername({ username });
    if (foundUser) {
      return foundUser;
    } else {
      return await User.create({ username, email, password });
    }
  }

  static async findByUsername({ username }) {
    let user;
    try {
      user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
    } catch (e) {
      //TO DO: Handle error when can't connect to database
      return null;
    }
    return user ? new User(user) : null;
  }

  static async create({ email, username, password }) {
    let user;
    try {
      user = await prisma.user.create({
        data: {
          email,
          username,
          password,
        },
      });
    } catch (e) {
      //TO DO: Handle error when user creation fails at the database level
      return null;
    }
    return new User(user);
  }
}
