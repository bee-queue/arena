const Run = require('./index.js');
const Bull = require('bull');

Run(
    {
        Bull,
        "queues": [
          {
            "type": "bull",
            "name": "EventService",
            "hostId": "CW",
            "redis": {
              "port": 6379,
              "host": process.env.REDIS_URL,
              "tls": {}
            }
          },
          {
            "type": "bull",
            "name": "MixPanelQueue",
            "hostId": "CW",
            "redis": {
              "port": 6379,
              "host": process.env.REDIS_URL,
              "tls": {}
            }
          },
          {
            "type": "bull",
            "name": "CustomerIOEvent",
            "hostId": "CW",
            "redis": {
              "port": 6379,
              "host": process.env.REDIS_URL,
              "tls": {}
            }
          }
        ],
      }
      
);