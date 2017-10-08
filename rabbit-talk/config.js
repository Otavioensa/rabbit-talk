'use strict';

const rabbit = {
  uri: process.env.rabbbitUri || 'amqp://localhost',
  workQueue: process.env.workQueue || 'workQueue',
  exchange: process.env.applicationExchange || 'ApplicationExchange',
  consumerExchange: process.env.consumerExchange || 'ConsumerExchange'
};
