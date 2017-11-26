import * as Amqp from "amqp-ts";

export const CONNECTION = new Amqp.Connection("amqp://localhost:5672");
export const EXCHANGE = CONNECTION.declareExchange("Ex1");
export const QUEUE = CONNECTION.declareQueue("Notification");