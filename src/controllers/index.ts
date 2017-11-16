import {HealthController} from './health';
import {SlackController} from './slack';


export const CONTROLLERS = [
    new HealthController(),
    new SlackController()
];