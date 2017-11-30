import {EXCHANGE} from './queue'; 
import * as Amqp from "amqp-ts";
import * as config from '../config/config.json';
import * as members from '../config/member.json';
import * as _ from 'lodash';

const QUEUE_CHANNEL_NAME_SLACK = (<any>config).QUEUE_CHANNEL_NAME_SLACK;

export class Publisher {
    public sendPayload(payload) {
        let payloadJSON = JSON.parse(payload);

        let message = {
            user: this.getUserNameByUserId(payloadJSON.user.id),
            value: payloadJSON.actions[0].value,
            callback_id: payloadJSON.callback_id
        }

        let msg = new Amqp.Message(message);
        EXCHANGE.send(msg, QUEUE_CHANNEL_NAME_SLACK);
    }

    public sendStatus(payload) {
        let msg = new Amqp.Message(payload);
        EXCHANGE.send(msg, QUEUE_CHANNEL_NAME_SLACK);
    }

    private getUserNameByUserId(userId: string) {
        return _.findKey((<any>members), (member) => { 
            return member === userId; 
        });
    }
}

export const publisher = new Publisher();
