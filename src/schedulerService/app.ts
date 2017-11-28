import {RequestHandler, Server} from 'restify';
import * as restify from 'restify';
import * as restifyClient from 'restify-clients';
import {HealthController} from './controllers/health';
import {SchedulerController} from './controllers/scheduler';
import * as Amqp from "amqp-ts";

var connection = new Amqp.Connection("amqp://localhost:5672");
var exchange = connection.declareExchange('scheduler');
var queue = connection.declareQueue("RevieverPayload");
queue.bind(exchange, 'Q_CHANNEL_SLACK');
queue.bind(exchange, 'Q_CHANNEL_MAIL')

queue.activateConsumer((message) => {
    let client = restifyClient.createJsonClient({url: 'http://localhost:1111'})

    client.post('/api/recieve', message.getContent(), (err, req, res, obj) => {
        console.log(res.statusCode);
    })

    console.log(message.getContent());
}, {noAck: true});

// Restify Web API
export let server = restify.createServer({
    name: 'scheduler'
});

//server.use(restify.plugins.CORS());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.fullResponse());

server.get('/scheduler/api/health', new HealthController().get);
server.post('/scheduler/api/send', new SchedulerController().send);

server.listen(1337, function () {
    console.log('Scheduler Service running - listening at %s', server.url);
});