'use strict';

const amqp = require('amqplib');
const config = require('../../config');
const promise = require('bluebird');

const uri = config.rabbit.uri;
const topicExchange = config.rabbit.topicExchange;
const assertExchangeOptions = { durable: false };
const data = process.argv[2] ? process.argv[2] : 'any data might be here :)';
const subject = process.argv[3] ? process.argv[3] : 'fixedSubject';

const publishData = () => {

  return amqp.connect(uri)
    .then((connection) => connection.createChannel())
    .then((channel) => assertAndSendToExchange(channel));
};

const assertAndSendToExchange = (channel) => {

  const bufferedData = new Buffer(data);

  return channel.assertExchange(topicExchange, 'topic', assertExchangeOptions)
    .then(() => channel.publish(topicExchange, subject, bufferedData))
    .then(() => channel.close())
    .then(() => process.exit(0));
};

return publishData();
