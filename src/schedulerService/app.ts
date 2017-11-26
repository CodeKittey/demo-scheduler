import {RequestHandler, Server} from 'restify';
import * as restify from 'restify';
import {HealthController} from './controllers/health';
import {SchedulerController} from './controllers/scheduler'

// Restify Web API
export let server = restify.createServer({
    name: 'scheduler'
});

//server.use(restify.plugins.CORS());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.fullResponse());

server.get('/scheduler/api/health', new HealthController().get);
server.get('/scheduler/api/send', new SchedulerController().send);

server.listen(1337, function () {
    console.log('Scheduler Service running - listening at %s', server.url);
});