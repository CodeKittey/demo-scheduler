import {Request, Response} from 'restify';
import {notificationService} from '../services/notificationservice';
import {INotificationMessage} from '../messages/INotificationMessage';
import {AvailableServices} from '../../config/availableservices';

export class SchedulerController {
    public send(req: Request, res: Response): void {
        let body = req.body;
        let users = [];
        for (let service in AvailableServices) {        
            users = body.users.filter(user => {
                if (user.notification_channel === service)
                    return user;            
            });

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
