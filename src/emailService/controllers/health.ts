import {ApiServer} from '../apiServer';

export class HealthController {
    public initialize(apiServer: ApiServer): void {
        apiServer.get('ping', (req, res) => res.send(200, 'hello'));
    }
}