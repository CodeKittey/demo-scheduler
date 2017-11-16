import {Service} from './service';
import {WebClient} from '@slack/client';
import {IncomingWebhook} from '@slack/client';

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';


export class SlackService implements Service {
   /* private token:string =  'xoxp-274493794343-273555581077-272874741008-c42311205cd324dfcc441f33a4523ff2'; //see section above on sensitive data
    private web:any = new WebClient(this.token);*/
    
    private webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

    public async list() {
        this.webhook.send('Hello there', function(err, res) {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('Message sent: ', res);
            }
        });
    }
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

export const slackService = new SlackService();