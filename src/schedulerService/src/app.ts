import {RequestHandler, Server} from 'restify';
import * as restify from 'restify';
import * as restifyClient from 'restify-clients';
import {HealthController} from './controllers/health';
import {SchedulerController} from './controllers/scheduler';
import * as Amqp from "amqp-ts";
import * as config from '../config/config.json';

const RABBITMQ_HOST = (<any>config).RABBITMQ_HOST;
const RABBITMQ_PORT = (<any>config).RABBITMQ_PORT;
const QUEUE_CHANNEL_NAME_MAIL = (<any>config).QUEUE_CHANNEL_NAME_MAIL;
const QUEUE_CHANNEL_NAME_SLACK = (<any>config).QUEUE_CHANNEL_NAME_SLACK;

const PAYLOAD_URL = (<any>config).PAYLOAD_URL;

var connection = new Amqp.Connection(`amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`);
var exchange = connection.declareExchange('scheduler');
var queue = connection.declareQueue("RevieverPayload");
queue.bind(exchange, QUEUE_CHANNEL_NAME_SLACK);
queue.bind(exchange, QUEUE_CHANNEL_NAME_MAIL)

queue.activateConsumer((message) => {
    let client = restifyClient.createJsonClient({url: PAYLOAD_URL})

    client.post('/api/recieve', message.getContent(), (err, req, res, obj) => {
        if (err) console.log(err);

        if (res) {
            console.log(res.statusCode);
        } else {
            console.log("Server ", PAYLOAD_URL, " is down");
        }
    })
}, {noAck: true});

// Restify Web API
export let server = restify.createServer({
    name: 'scheduler'
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.fullResponse());

server.get('/scheduler/api/health', new HealthController().get);
server.post('/scheduler/api/send', new SchedulerController().send);

server.listen(1337, () => {
    console.log(`Scheduler Service running listening at ${server.url}`);
});