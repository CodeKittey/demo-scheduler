import * as Amqp from "amqp-ts";
import * as config from '../config/config.json';

const RABBITMQ_HOST = (<any>config).RABBITMQ_HOST;
const RABBITMQ_PORT = (<any>config).RABBITMQ_PORT;

export const CONNECTION = new Amqp.Connection(`amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`);
export const EXCHANGE = CONNECTION.declareExchange('scheduler');

