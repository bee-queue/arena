const Helpers = {
  processFlow: function (flow) {
    if (!flow) return {};
    const {job, children = []} = flow;
    const filteredChildren = children.filter((child) => child);
    const queueName = job.queueName;

    if (filteredChildren.length > 0) {
      return {
        job: {...job, queueName},
        children: filteredChildren.map((child) => this.processFlow(child)),
      };
    } else {
      return {
        job: {...job, queueName},
      };
    }
  },
};

module.exports = Helpers;
