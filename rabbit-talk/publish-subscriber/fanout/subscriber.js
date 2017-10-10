'use strict';

const amqp = require('amqplib');
const config = require('../../config');
const promise = require('bluebird');

const uri = config.rabbit.uri;
const xptoExchange = config.rabbit.xptoExchange;
const assertExchangeOptions = { durable: false };
const assertQueueOptions = { exclusive: true };
const consumeExchangeOptions = { noAck: false };

const assertAndConsumeExchange = (channel) => {

  const ackMessage = (msg) => processMessage(msg).then(() => channel.ack(msg));

  return channel.assertExchange(xptoExchange, 'fanout', assertExchangeOptions)
    .then(() => channel.assertQueue('', assertQueueOptions))
    .then((queueOk) => channel.bindQueue(queueOk.queue, xptoExchange, '').then(() => queueOk.queue))
    .then((queue) => channel.consume(queue, ackMessage, consumeExchangeOptions));
};

const processMessage = (msg) => promise.resolve(console.log(`Message received: ${msg.content.toString()}`));

return amqp.connect(uri)
  .then((connection) => connection.createChannel())
  .then((channel) => assertAndConsumeExchange(channel));
