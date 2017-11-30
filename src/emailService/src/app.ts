import {RequestHandler, Server} from 'restify';
import * as restify from 'restify';
import {HealthController} from './controllers/health';
import {MailController} from './controllers/mail';
import * as Amqp from "amqp-ts";
import {INotificationMessage} from './messages/INotificationMessage';
import * as config from './config/config.json';

const RABBITMQ_HOST = (<any>config).RABBITMQ_HOST;
const RABBITMQ_PORT = (<any>config).RABBITMQ_PORT;
const connection = new Amqp.Connection(`amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`);
const exchange = connection.declareExchange('scheduler');
const queue = connection.declareQueue("NotificationMAIL");
queue.bind(exchange, 'notificationMAIL');

queue.activateConsumer((message) => {
    new MailController().postMessage(message.getContent());
}, {noAck: true});

// Restify Web API
export let server = restify.createServer({
    name: 'mailService'
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.fullResponse());

server.get('/mail/api/health', new HealthController().get);
server.get('/mail/recieve', new MailController().recievePayload);


server.listen(8090, function () {
    console.log(`Mail Service running listening at ${server.url}`);
});