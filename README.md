# Arena

An intuitive Web GUI for [Bee Queue](https://github.com/bee-queue/bee-queue) and [Bull](https://github.com/optimalbits/bull). Built on Express so you can run Arena standalone, or mounted in another app as middleware.

For a quick introduction to the motivations for creating Arena, read *[Interactively monitoring Bull, a Redis-backed job queue for Node](https://www.mixmax.com/blog/introducing-bull-arena)*.

### Screenshots

[![](screenshots/screen1_sm.png)](screenshots/screen1.png) [![](screenshots/screen2_sm.png)](screenshots/screen2.png) [![](screenshots/screen3_sm.png)](screenshots/screen3.png)

### Features

* Check the health of a queue and its jobs at a glance
* Paginate and filter jobs by their state
* View details and stacktraces of jobs with permalinks
* Restart and retry jobs with one click

### Usage

#### Prerequisites

Configure your queues in the "queues" key of [`index.json`](src/server/config/index.json).

Queues are JSON objects. Here are the configuration keys that are common to all three configuration ways:

```js
{
  // required string
  "name": "my_queue",

  // host display name, give it a helpful name for reference
  // required string
  "hostId": "Queue Server 1",

  // optional string
  // default: null (will assume Bull)
  "type": "bee",

  // queue keys prefix
  // optional string
  // default: "bq" for Bee, "bull" for Bull
  "prefix": "foo"
}
```

The required `name` and `hostId` have to be present in any of the following JSON objects, the optional keys can be present in them.

The three ways in which you can configure the client are:

##### 1. port/host

```js
{
  // hostname or IP
  // required string
  "host": "127.0.0.1",

  // optional number
  // default: 6379
  "port": 6379,

  // optional string
  "password": "hello",

  // optional number
  // default: 0
  "db": 1,
}
```

##### 2. URL

You can also provide a `url` field instead of `host`, `port`, `db` and `password`.

```js
{
  "url": "[redis:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]"
}
```

##### 3. Redis client options

Arena is compatible with both Bee and Bull.
If you need to pass some specific configuration options directly to the redis client library your queue uses, you can also do so.

Bee uses node [redis](https://www.npmjs.com/package/redis) client, Bull uses [ioredis](https://www.npmjs.com/package/ioredis) client.
These clients expect different configurations options.

```js
{
  "redis": {}
}
```

For Bee, the `redis` key will be directly passed to [`redis.createClient`](https://github.com/NodeRedis/node_redis#rediscreateclient), as explained [here](https://github.com/bee-queue/bee-queue#settings).

For Bull, the `redis` key will be directly passed to [`ioredis`](https://github.com/luin/ioredis/blob/master/API.md#new_Redis_new), as explained [here](https://github.com/OptimalBits/bull/blob/master/REFERENCE.md#queue). To use this to connect to a Sentinel cluster, see [here](https://github.com/luin/ioredis/blob/master/README.md#sentinel).

##### Custom configuration file

To specify a custom configuration file location, see [Running Arena as a node module](#running-arena-as-a-node-module).

*Note that if you happen to use Amazon Web Services' ElastiCache as your Redis host, check out http://mixmax.com/blog/bull-queue-aws-autodiscovery*

#### Running the server

Run `npm install` to fetch Arena's dependencies. Then run `npm start` to start the server.

Note that because Arena is implemented using `async`/`await`, Arena only currently supports Node `>=7.6`.

#### Running Arena as a node module

Alternatively, you can use Arena as a node module. This has potential benefits:

* Arena can be configured to use any method of server/queue configuration desired
  * for example, fetching available redis queues from an AWS instance on server start
  * or even just plain old reading from environment variables
* Arena can be mounted in other express apps as middleware

Usage:

In project folder:

```shell
npm install bull-arena
```

In router.js:

```js
const Arena = require('bull-arena');

const express = require('express');
const router = express.Router();

const arena = Arena({
  queues: [
    {
      // First queue configuration
    },
    {
      // Second queue configuration
    },
    {
      // And so on...
    }
  ]
});
router.use('/', arena);
```

`Arena` takes two arguments. The first, `config`, is a plain object containing the [queue configuration](#prerequisites). The second, `listenOpts`, is an object that can contain the following optional parameters:

* `port` - specify custom port to listen on (default: 4567)
* `host` - specify custom ip to listen on (default: '0.0.0.0')
* `basePath` - specify custom path to mount server on (default: '/')
* `disableListen` - don't let the server listen (useful when mounting Arena as a sub-app of another Express app) (default: false)
* `useCdn` - set false to use the bundled js and css files (default: true)

##### Example config (for bull)

```js
import Arena from 'bull-arena';

const arenaConfig = Arena({
  queues: [
    {
      // Name of the bull queue, this name must match up exactly with what you've defined in bull.
      name: "Notification_Emailer",

      // Hostname or queue prefix, you can put whatever you want.
      hostId: "MyAwesomeQueues",

      // Redis auth.
      redis: {
        port: /* Your redis port */,
        host: /* Your redis host domain*/,
        password: /* Your redis password */,
      },
    },
  ],
},
{
  // Make the arena dashboard become available at {my-site.com}/arena.
  basePath: '/arena',

  // Let express handle the listening.
  disableListen: true
});

// Make arena's resources (js/css deps) available at the base app route
app.use('/', arenaConfig);
```
(Credit to [tim-soft](https://github.com/tim-soft) for the example config.)

### Bee Queue support

Arena is dual-compatible with Bull 3.x and Bee-Queue 1.x. To add a Bee queue to the Arena dashboard, include the `type: bee` attribute with an individual queue's configuration object.

### Docker image

You can now `docker pull` Arena from [Docker Hub](https://hub.docker.com/r/mixmaxhq/arena/).

To build the image simply run:

```shell
docker build -t <name-image> .
```

To run a container, execute the following command. Note that we need to settle the location of `index.json` in this container via volume mounting:

```shell
docker run -p 4567:4567 -v </local/route/to/index.json>:/opt/arena/src/server/config/index.json <name-image>
```

### Development

Arena is written using Express, with simple jQuery and Handlebars on the front end.

### License

The [MIT License](LICENSE).
