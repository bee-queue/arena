const Run = require('./index.js');
const Bull = require('bull');
const fs = require('fs');
const path = require('path');

var config = JSON.parse(fs.readFileSync(path.join(__dirname, '../constants.json')));

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
              "host": config.redis.url
            }
          }
        ],
      }
      
);