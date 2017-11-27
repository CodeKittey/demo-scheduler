import {Service} from '../../service';
import {WebClient, IncomingWebhook, CLIENT_EVENTS, RtmClient} from '@slack/client';
import * as config from '../config/config.json';
import {INotificationMessage} from '../messages/INotificationMessage';
import * as members from '../config/member.json';
import * as _ from 'lodash';


const WEBHOOK_URL_TTBOT = (<any>config).WEBHOOK_URL_TTBOT;
const BOT_TOKEN = (<any>config).BOT_TOKEN;

export class SlackService implements Service {
    private web:any = new WebClient(BOT_TOKEN);
    priv

    private createWebhookMessage(message: INotificationMessage) {
        return {
                text: 'New Scheduler service incoming',
                iconEmoji: ':robot_face:',
                channel: '#random',
                linkNames: '1',
                attachments: [
                        {
                            "text": message.text,
                            "fallback": "You are unable to choose a game",
                            "callback_id": message.callback_id,
                            "color": "#3AA3E3",
                            "attachment_type": "default",
                            "actions": [
                                {
                                    "name": "scheduler",
                                    "text": message.actions[0].text,
                                    "type": "button",
                                    "value": message.actions[0].value
                                },
                                {
                                    "name": "scheduler",
                                    "text": message.actions[1].text,
                                    "type": "button",
                                    "value": message.actions[1].value
                                }
                            ]
                        }
                    ]
                }
    }


    public postMessage(message: INotificationMessage) {
        const webhookmessage = this.createWebhookMessage(message);   
        console.log(WEBHOOK_URL_TTBOT) ;       
            let wh = new IncomingWebhook(WEBHOOK_URL_TTBOT);
            wh.send(webhookmessage);



    };

//U81GBH329 kraus
//U81HE6GV8 kitty


    private getWebHookURL(nameKey: string) {
        const memberEntry = _.find((<any>members), (entry) => { 
            if(entry.key === nameKey) return entry.webhookurl;
        });

        console.log(memberEntry.webhookurl);

        return memberEntry.webhookurl;
    }
}

export const slackService = new SlackService();