const Run = require('./index.js');
const Bull = require('bull');
const _ = require('lodash');

const queueList = ["EventService", "MixPanelQueue", "CustomerIOEvent"];
const queues = [];

_.forEach(queueList, function (queue) {
  queues.push({
    "type": "bull",
    "hostId": process.env.HOST,
    "redis": {
      "port": 6379,
      "host": process.env.REDIS_URL,
      ...((process.env.REDIS_TLS==="true") && { tls: {} })
    },
    "name": queue
  });
});

Run(
  {
      Bull,
      "queues": queues,
    }
    
);
