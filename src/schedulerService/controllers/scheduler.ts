import {Request, Response} from 'restify';
import {notificationService} from '../services/notificationservice';
import {INotificationMessage} from '../messages/INotificationMessage';
import {AvailableServices} from '../config/availableservices';

export class SchedulerController {
    private transformIncomingMessage(message, users):  INotificationMessage {
        let notification: INotificationMessage;

        notification.users = users;
        notification.actions = message.actions;
        notification.callback_id = message.callback_id;
        notification.text = message.text;

        return notification;
    }

    public send(req: Request, res: Response): void {
        let body = req.body;
        let users = [];
        for (let service in AvailableServices) {        
            users = body.users.filter(user => {
                if (user.notification_channel === service)
                    return user;
            
            });

            //notification = this.transformIncomingMessage(body, users);
             let notification: INotificationMessage;

             notification = {
                 users: users,
                 callback_id: body.callback_id,
                 text: body.text,
                 actions: body.actions
             }

             let queueName = 'notification' + service;
            notificationService.send(notification, queueName);
        }

        res.send(200);
    }
}

/*
        notification = {
            users: [{name: 'kraus', notification_channel: 'slack'},{name: 'rauber', notification_channel: 'slack'}],
            callback_id: 'generated_uuid',
            text: 'Willst du mit mir gehen?',
            actions: [{text: 'Ja', value: 'yes'},{text: 'Nein', value: 'no'}]
        }
        */