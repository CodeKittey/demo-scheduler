import {Request, Response} from 'restify';
import {slackService} from '../service/slackservice';
import {publisher} from '../service/Publisher';
import {INotificationMessage} from '../messages/INotificationMessage';

export class SlackController {
    public postMessage(message: INotificationMessage): void {
        slackService.postMessage(message);
    }

    public recievePayload(req: Request, res: Response): void {
        if (req.body.payload) {
            publisher.sendPayload(req.body.payload);
        }
        res.send(200);
    }
}