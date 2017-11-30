import {EXCHANGE} from './queue'; 
import * as Amqp from "amqp-ts";
import * as config from '../config/config.json';
const QUEUE_CHANNEL_NAME_MAIL = (<any>config).QUEUE_CHANNEL_NAME_MAIL;

export class Publisher {
    public sendPayload(payload) {
        let msg = new Amqp.Message(payload);
        EXCHANGE.send(msg, QUEUE_CHANNEL_NAME_MAIL);
    }
}

export const publisher = new Publisher();
