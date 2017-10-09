'use strict';

const rabbit = {
  uri: process.env.rabbbitUri || 'amqp://localhost',
  workQueue: process.env.workQueue || 'workQueue',
  xptoExchange: process.env.xptoExchange || 'xptoExchange'
};

module.exports = {
  rabbit: rabbit
};
