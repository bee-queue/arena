## Overview

This is a simple demonstration of how to run Arena and connect it to [Bee Queue](https://github.com/mixmaxhq/bee-queue) or [Bull Queue](https://github.com/OptimalBits/bull) or [BullMQ](https://github.com/taskforcesh/bullmq).

## Requirements

- Node >= 7.6
- No other services running on ports 4735 or 6379

## Start Redis

In case you don't have redis installed, there is a redis docker-compose for development purposes.

- Before starting Redis, make sure you have [docker-compose](https://docs.docker.com/compose/install/) installed.
- Then execute `npm run dc:up`

## Install

`npm install`

## Running

`npm run start:fastify`

or

`npm run start:express`

or

`npm run start:bee`

or

`npm run start:bull`

or

`npm run start:bullmq`

or

`npm run start:bullmq_with_flows`

Then open http://localhost:4735 in your browser.
