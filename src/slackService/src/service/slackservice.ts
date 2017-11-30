import {WebClient} from '@slack/client';
import * as config from '../config/config.json';
import {INotificationMessage} from '../messages/INotificationMessage';
import * as members from '../config/member.json';
import {publisher} from './publisher';
import * as _ from 'lodash';

const BOT_USER_OAUTH_ACCESS_TOKEN =  (<any>config).BOT_USER_OAUTH_ACCESS_TOKEN;
const QUEUE_CHANNEL_NAME_SLACK =  (<any>config).QUEUE_CHANNEL_NAME_SLACK;

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
        
            if (!userId) {
                publisher.sendStatus({"type": "error", "text": "User with username: " + user.name + " not found."});
            }

            this.web.chat.postMessage(this.getUserIdByName(user.name), 'New Scheduler service incoming', options, (err, res) => {
            if (err) {
                publisher.sendStatus({"type": "error", "text": err});
            } else {
                publisher.sendStatus({"type": "success", "text":"Success sending Message to: " + user.name});
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
}

export const slackService = new SlackService();