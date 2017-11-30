import {Request, Response} from 'restify';

export class HealthController {
    public get(req: Request, res: Response): void {
        res.send(200, 'im alive');
    }
}