'use strict';

const amqp = require('amqplib');
const config = require('../config');
const promise = require('bluebird');

const uri = config.rabbit.uri;
const xptoExchange = config.rabbit.xptoExchange;
const assertExchangeOptions = { durable: false };
const data = process.argv[2] ? process.argv[2] : 'any data might be here :)';

const publishData = () => {

  return amqp.connect(uri)
    .then((connection) => connection.createChannel())
    .then((channel) => assertAndSendToExchange(channel));
};

const assertAndSendToExchange = (channel) => {

  const bufferedData = new Buffer(data);

  return channel.assertExchange(xptoExchange, 'fanout', assertExchangeOptions)
    .then(() => channel.publish(xptoExchange, '', bufferedData))
    .then(() => channel.close());
};

return publishData()
  .then(() => process.exit(0));
