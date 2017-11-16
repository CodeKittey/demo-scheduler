"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@slack/client");
const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
class SlackService {
    constructor() {
        /* private token:string =  'xoxp-274493794343-273555581077-272874741008-c42311205cd324dfcc441f33a4523ff2'; //see section above on sensitive data
         private web:any = new WebClient(this.token);*/
        this.webhook = new client_1.IncomingWebhook(SLACK_WEBHOOK_URL);
        /*public async list() {
            await this.web.channels.list(function(err, info) {
            if (err) {
                console.log('Error:', err);
            } else {
                for(var i in info.channels) {
                    console.log(info.channels[i].name);
                }
            }
            });
        }*/
    }
    async list() {
        this.webhook.send('Hello there', function (err, res) {
            if (err) {
                console.log('Error:', err);
            }
            else {
                console.log('Message sent: ', res);
            }
        });
    }
}
exports.SlackService = SlackService;
exports.slackService = new SlackService();
//# sourceMappingURL=slackservice.js.map