import {Service} from '../../service';
import {WebClient, IncomingWebhook, CLIENT_EVENTS, RtmClient} from '@slack/client';
import * as config from '../config/config.json';
import {INotificationMessage} from '../messages/INotificationMessage';


const SLACK_WEBHOOK_URL = (<any>config).WEBHOOK_URL;
const BOT_TOKEN = (<any>config).BOT_TOKEN;

export class SlackService implements Service {
    private web:any = new WebClient(BOT_TOKEN);
    private webhook = new IncomingWebhook(SLACK_WEBHOOK_URL, {
            username: 'My custom username',
            iconEmoji: ':slack:',
    });


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
        this.webhook.send(webhookmessage);
    };
}

export const slackService = new SlackService();