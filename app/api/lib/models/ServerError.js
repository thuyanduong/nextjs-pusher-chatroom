export default class ServerError {
  constructor(error) {
    this.success = false;
    this.error = error;
    this.status = 500;
  }
}