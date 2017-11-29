import {WebClient} from '@slack/client';
import * as config from '../config/config.json';
import {INotificationMessage} from '../messages/INotificationMessage';
import * as members from '../config/member.json';
import * as _ from 'lodash';
import {EXCHANGE} from './queue'; 
import * as Amqp from "amqp-ts";

const BOT_USER_OAUTH_ACCESS_TOKEN = process.env.BOT_USER_OAUTH_ACCESS_TOKEN;

export class SlackService {
    private web:any = new WebClient(BOT_USER_OAUTH_ACCESS_TOKEN);
    
    private createWebhookAttachment(message: INotificationMessage) {
        return {
                attachments: [
                        {
                            "text": message.text,
                            "callback_id": message.callback_id,
                            "attachment_type": "default",
                            "actions": this.createUserAction(message.actions)
                        },
                    ],
                as_user: true
                }
    }


    public postMessage(message: INotificationMessage) {
        const options = this.createWebhookAttachment(message);
        
        message.users.forEach(user => {
            let userId = this.getUserIdByName(user.name);
        
            if (!userId) return "User with username: " + user.name + "not found.";

            this.web.chat.postMessage(this.getUserIdByName(user.name), 'New Scheduler service incoming', options, (err, res) => {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('Message sent: ');
            }
        });
     });
    };


    private getUserIdByName(nameKey: string) {
        return (<any>members)[nameKey];
    }

    private createUserAction(actions) {
        let userActions = [];

        actions.forEach(action => {
            userActions.push({
                "name": "scheduler",
                "text": action.text,
                "type": "button",
                "value": action.value
            })
        });

        return userActions;
    }

    public sendPayload(payload) {
        let payloadJSON = JSON.parse(payload);

        let message = {
            user: this.getUserNameByUserId(payloadJSON.user.id),
            value: payloadJSON.actions[0].value,
            callback_id: payloadJSON.callback_id
        }

        let msg = new Amqp.Message(message);
        EXCHANGE.send(msg, process.env.QUEUE_CHANNEL_NAME_SLACK);
    }

    private getUserNameByUserId(userId: string) {
        return _.findKey((<any>members), (member) => { 
            return member === userId; 
        });
    }
}

export const slackService = new SlackService();