//FRONTEND User model

export default class User {
  constructor({ id, displayName, email, createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
