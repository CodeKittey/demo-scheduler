import {Service} from './service';
import {WebClient} from '@slack/client';
import {IncomingWebhook} from '@slack/client';

const SLACK_WEBHOOK_URL = '';


export class SlackService implements Service {
   /* private token:string =  ''
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