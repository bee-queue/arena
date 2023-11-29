const _ = require('lodash');

/*
  This class will be allowed only for BullMQ
*/
class Flows {
  constructor(config) {
    this._flows = {};

    this.useCdn = {
      value: true,
      get useCdn() {
        return this.value;
      },
      set useCdn(newValue) {
        this.value = newValue;
      },
    };

    this.setConfig(config);
  }

  list() {
    return this._config.flows;
  }

  hasFlows() {
    return this._config.flows && this._config.flows.length;
  }

  setConfig(config) {
    this._config = {...config, flows: config.flows && config.flows.slice()};

    if (
      this._config.flows &&
      this._config.flows.length &&
      !this._checkConstructors()
    ) {
      throw new TypeError(
        'as of 1.16.0, bullmq requires that the flow connections be provided to Arena'
      );
    }
  }

  _checkConstructors() {
    const hasBullMQ = this._config.flows.every(
      (flow) => flow.type === 'bullmq'
    );

    return hasBullMQ && this._config.BullMQ;
  }

  async get(connectionName, queueHost) {
    const flowConfig = _.find(this._config.flows, {
      name: connectionName,
      hostId: queueHost,
    });
    if (!flowConfig) return null;

    if (this._flows[queueHost] && this._flows[queueHost][connectionName]) {
      return this._flows[queueHost][connectionName];
    }

    const {
      type,
      port,
      host,
      db,
      password,
      prefix,
      url,
      redis,
      tls,
    } = flowConfig;

    const redisHost = {host};
    if (password) redisHost.password = password;
    if (port) redisHost.port = port;
    if (db) redisHost.db = db;
    if (tls) redisHost.tls = tls;

    const isBullMQ = type === 'bullmq';

    const options = {
      redis: redis || url || redisHost,
    };
    if (prefix) options.prefix = prefix;

    let flow;
    if (isBullMQ) {
      if (flowConfig.createClient)
        options.createClient = flowConfig.createClient;

      const {FlowBullMQ} = this._config;
      const {redis, ...rest} = options;
      flow = new FlowBullMQ({
        connection: redis,
        ...rest,
      });
      flow.IS_BULLMQ = true;
    }

    this._flows[queueHost] = this._flows[queueHost] || {};
    this._flows[queueHost][connectionName] = flow;

    return flow;
  }

  /**
   * Creates and adds jobs with the given data using the provided flow.
   *
   * @param {Object} flow A Bullmq flow class
   * @param {Object} data The data to be used within the flow
   */
  async set(flow, data) {
    const args = [data];

    return flow.add.apply(flow, args);
  }
}

module.exports = Flows;
