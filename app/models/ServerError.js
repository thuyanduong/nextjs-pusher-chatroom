export default class ServerError {
  constructor(errorMessage) {
    this.errorMessage = errorMessage;
    this.success = false;
    this.error = true;
  }
}