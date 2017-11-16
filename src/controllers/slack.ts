import {ApiServer} from '../apiServer';
import {Request, Response} from 'restify';
import {slackService} from '../services/slackservice';

export class SlackController {
    public initialize(apiServer: ApiServer): void {
        apiServer.get('slack/list', this.list.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await slackService.list());
    }
}