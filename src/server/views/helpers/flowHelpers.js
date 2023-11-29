const Helpers = {
  processFlow: function (flow) {
    const {job, children} = flow;
    const queueName = job.queueName;

    if (children && children.length > 0) {
      return {
        job: {...job, queueName},
        children: children.map((child) => this.processFlow(child)),
      };
    } else {
      return {
        job: {...job, queueName},
      };
    }
  },
};

module.exports = Helpers;
