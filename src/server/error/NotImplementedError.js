module.exports = class NotImplementedError extends Error {
  constructor(message = "") {
    super();
    this.message = message;
    this.name = this.constructor.name;
  }
};
