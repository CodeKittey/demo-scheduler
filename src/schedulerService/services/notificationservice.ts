import * as Amqp from "amqp-ts";
import {INotificationMessage} from '../messages/INotificationMessage';
import {EXCHANGE} from './queue'


export class NotificationService {

    public send(message: INotificationMessage, queueName: string) {
        let msg = new Amqp.Message(message);
        EXCHANGE.send(msg, queueName);
    }
}

export const notificationService = new NotificationService();