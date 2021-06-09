const Helpers = {
  getJobId: function (jobData) {
    if (!jobData) return '';
    return jobData.substring(jobData.lastIndexOf(':') + 1, jobData.length);
  },
};

module.exports = Helpers;
