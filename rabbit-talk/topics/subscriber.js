'use strict';

const amqp = require('amqplib');
const config = require('../config');
const promise = require('bluebird');

const uri = config.rabbit.uri;
const routingExchange = config.rabbit.routingExchange;
const assertExchangeOptions = { durable: false };
const assertQueueOptions = { exclusive: true };
const consumeExchangeOptions = { noAck: false };
const subject = process.argv[2] ? process.argv[2] : 'fixedSubject';

const assertAndConsumeExchange = (channel) => {

  const ackMessage = (msg) => processMessage(msg).then(() => channel.ack(msg));

  return channel.assertExchange(routingExchange, 'topic', assertExchangeOptions)
    .then(() => channel.assertQueue('', assertQueueOptions))
    .then((queueOk) => channel.bindQueue(queueOk.queue, routingExchange, subject).then(() => queueOk.queue))
    .then((queue) => channel.consume(queue, ackMessage, consumeExchangeOptions));
};

const processMessage = (msg) => promise.resolve(console.log(`Message received: ${msg.content.toString()}`));

return amqp.connect(uri)
  .then((connection) => connection.createChannel())
  .then((channel) => assertAndConsumeExchange(channel));
