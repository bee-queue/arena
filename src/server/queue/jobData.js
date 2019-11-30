module.exports = class JobData {
  constructor({id, name, data, stacktrace, timestamp, progress, delay, attemptsMade, returnValue, failedReason}) {
    this.id = id;
    this.name = name;
    this.data = data;
    this.progress = progress;
    this.attemptsMade = attemptsMade;
    this.returnValue = returnValue;
    this.failedReason = failedReason;
    this.options = {
      stacktrace,
      timestamp,
      delay,
    };
  }
};
