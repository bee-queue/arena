const {describe} = require('ava-spec');
const sinon = require('sinon');
const sandbox = require('sandboxed-module');

describe('Queue', (it) => {
  const name = 'name';
  const hostId = 'hostId';
  const queue = {add() {}};
  const queueConfig = {name, hostId};
  const config = {queues: [queueConfig]};

  it.beforeEach((t) => {
    const buildQueue = sinon
      .stub()
      .withArgs(queueConfig)
      .returns(queue);

    const Queues = sandbox.require('../../../src/server/queue', {
      requires: {
        './builder': {queue: buildQueue},
        lodash: require('lodash')
      }
    });

    const queues = new Queues(config);

    Object.assign(t.context, {queues});
  });

  describe('get', (it) => {
    it.beforeEach((t) => {
      const get = (n = name, h = hostId) => t.context.queues.get(n, h);
      Object.assign(t.context, {get});
    });

    it('builds a queue and returns it', (t) => {
      t.plan(1);
      t.is(t.context.get(), queue);
    });

    it('returns an existing queue', (t) => {
      t.plan(1);
      t.is(t.context.get(), t.context.get());
    });

    it('returns nothing if no config is found', (t) => {
      t.plan(1);
      t.is(t.context.get('not', 'found'), undefined);
    });
  });

  describe('list', (it) => {
    it('returns the list of queues in config', (t) => {
      t.plan(1);
      t.is(t.context.queues.list(), config.queues);
    });
  });
});
