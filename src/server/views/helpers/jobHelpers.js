const Helpers = {
  getKeyProperties: function (jobData) {
    if (!jobData) return '';
    const [, queueName, id] = jobData.split(':');

    return {
      id,
      queueName,
    };
  },
};

module.exports = Helpers;
