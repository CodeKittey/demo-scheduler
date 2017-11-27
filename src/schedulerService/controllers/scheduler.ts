import {Request, Response} from 'restify';
import {notificationService} from '../services/notificationservice';
import {INotificationMessage} from '../messages/INotificationMessage';

export class SchedulerController {
    public send(req: Request, res: Response): void {
        let notification: INotificationMessage;
        notification = {
            users: [{name: 'kraus', notification_channel: 'slack'},{name: 'rauber', notification_channel: 'slack'}],
            callback_id: 'generated_uuid',
            text: 'Willst du mit mir gehen?',
            actions: [{text: 'Ja', value: 'yes'},{text: 'Nein', value: 'no'}]
        }

        notificationService.send(notification);
        res.send(200);
    }
}