const {describe} = require('ava-spec');
const sandbox = require('sandboxed-module');

describe('Builder', (it) => {
  class Queue {
    constructor(name, options) {
      Object.assign(this, {name, options});
    }
  }

  class Bull extends Queue {}

  class Bee extends Queue {}

  it.beforeEach((t) => {
    const Builder = sandbox.require('../../../src/server/queue/builder', {
      requires: {
        bull: Bull,
        'bee-queue': Bee,
        lodash: require('lodash')
      }
    });

    const build = (config) => Builder.queue(config);

    Object.assign(t.context, {build});
  });

  it.describe('queue', (it) => {
    it('returns an instance of Bee if type is bee', (t) => {
      t.plan(2);
      const queue = t.context.build({type: 'bee'});
      t.true(queue instanceof Bee);
      t.true(queue.IS_BEE);
    });

    it('returns an instance of Bull if type is bull', (t) => {
      t.plan(2);
      const queue = t.context.build({type: 'bull'});
      t.true(queue instanceof Bull);
      t.false(queue.IS_BEE);
    });

    it('has options specific to bee', (t) => {
      t.plan(4);
      const {options: {isWorker, getEvents, sendEvents, storeJobs}} = t.context.build({
        type: 'bee'
      });
      t.false(isWorker);
      t.false(getEvents);
      t.false(sendEvents);
      t.false(storeJobs);
    });

    it('does not have Bee-specific options if type is bull', (t) => {
      t.plan(4);
      const {options: {isWorker, getEvents, sendEvents, storeJobs}} = t.context.build({
        type: 'bull'
      });
      t.is(isWorker, undefined);
      t.is(getEvents, undefined);
      t.is(sendEvents, undefined);
      t.is(storeJobs, undefined);
    });

    it('has a prefix if it is supplied', (t) => {
      t.plan(1);
      const {options: {prefix}} = t.context.build({type: 'bee', prefix: 'foo'});
      t.is(prefix, 'foo');
    });

    it('uses the redis key for redis config if it supplied', (t) => {
      t.plan(1);

      const {options: {redis}} = t.context.build({
        type: 'bee',
        redis: 'redis',
        url: 'url',
        host: 'host',
        port: 'port',
        db: 'db',
        password: 'password'
      });

      t.is(redis, 'redis');
    });

    it('uses the url key for redis config if it supplied', (t) => {
      t.plan(1);

      const {options: {redis}} = t.context.build({
        url: 'url',
        host: 'host',
        port: 'port',
        db: 'db',
        password: 'password'
      });

      t.is(redis, 'url');
    });

    it('grabs the host, port, db, and password if they are supplied', (t) => {
      t.plan(1);

      const {options: {redis}} = t.context.build({
        host: 'host',
        port: 'port',
        db: 'db',
        password: 'password'
      });

      t.deepEqual(redis, {
        host: 'host',
        port: 'port',
        db: 'db',
        password: 'password'
      });
    });

    it('merges in extra options from config', (t) => {
      t.plan(1);

      const {options: {extra}} = t.context.build({
        options: {
          extra: 'hello'
        }
      });

      t.is(extra, 'hello');
    });
  });
});
