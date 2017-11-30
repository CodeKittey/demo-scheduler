import {Request, Response} from 'restify';
import {emailService} from '../service/emailservice';
import {INotificationMessage} from '../messages/INotificationMessage';
import {publisher} from '../service/publisher';

export class MailController {
    public postMessage(message: INotificationMessage): void {
       emailService.postMessage(message);
    }

    public recievePayload(req: Request, res: Response): void {
        if (req.query) {
            publisher.sendPayload(req.query);
        }

        res.send(200);
    }
}