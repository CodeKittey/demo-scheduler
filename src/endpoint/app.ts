import {RequestHandler, Server} from 'restify';
import * as restify from 'restify';


// Restify Web API
export let server = restify.createServer({
    name: 'endPointTest'
});

//server.use(restify.plugins.CORS());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.fullResponse());

server.post('/api/recieve', (req, res) => {
    console.log(req.body);
    res.send(200);
});


server.listen(1111, function () {
    console.log('Endpoint Test running - listening at %s', server.url);
});