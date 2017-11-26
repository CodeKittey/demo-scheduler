import * as Amqp from "amqp-ts";
import {INotificationMessage} from '../messages/INotificationMessage';
import {EXCHANGE} from './queue'


export class NotificationService {

    public send(message: INotificationMessage) {
        var msg = new Amqp.Message(message);
        EXCHANGE.send(msg);
    }
}

export const notificationService = new NotificationService();