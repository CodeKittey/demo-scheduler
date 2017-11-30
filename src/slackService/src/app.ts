import {RequestHandler, Server} from 'restify';
import * as restify from 'restify';
import {HealthController} from './controllers/health';
import {SlackController} from './controllers/slack';
import * as Amqp from "amqp-ts";
import {INotificationMessage} from './messages/INotificationMessage';
import * as config from '../config/config.json';

const RABBITMQ_HOST = (<any>config).RABBITMQ_HOST;
const RABBITMQ_PORT = (<any>config).RABBITMQ_PORT;

var connection = new Amqp.Connection(`amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`);
var exchange = connection.declareExchange('scheduler');
var queue = connection.declareQueue("NotificationSLACK");
queue.bind(exchange, 'notificationSLACK');

queue.activateConsumer((message) => {
    new SlackController().postMessage(message.getContent());
}, {noAck: true});

// Restify Web API
export let server = restify.createServer({
    name: 'slackService'
});

//server.use(restify.plugins.CORS());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.fullResponse());

server.get('/slack/api/health', new HealthController().get);
server.post('/slack/recieve', new SlackController().recievePayload);


server.listen(8080, function () {
    console.log(`Slack Service running listening at ${server.url}`);
});