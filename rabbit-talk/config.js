'use strict';

const rabbit = {
  uri: process.env.rabbbitUri || 'amqp://localhost',
  workQueue: process.env.workQueue || 'workQueue',
  xptoExchange: process.env.xptoExchange || 'xptoExchange',
  routingExchange: process.env.routingExchange || 'routingExchange'
};

module.exports = {
  rabbit: rabbit
};
