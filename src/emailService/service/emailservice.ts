import * as config from '../config/config.json';
import {INotificationMessage} from '../messages/INotificationMessage';
import * as members from '../config/member.json';
import * as _ from 'lodash';
import {EXCHANGE} from './queue'; 
import * as Amqp from "amqp-ts";
const sgMail = require('@sendgrid/mail');
const API_MAIL_KEY = (<any>config).API_MAIL_KEY;
const MAIL_SERVICE_URL = (<any>config).MAIL_SERVICE_URL;

export class EmailService {
    public postMessage(message: INotificationMessage) {
        sgMail.setApiKey(API_MAIL_KEY);

        message.users.forEach(user => {
                let userMail = this.getUserEmailByName(user.name);
            
                if (!userMail) return "User with username: " + user.name + "not found.";
                const msg = {
                    to: userMail,
                    from: 'tt@tt.com',
                    subject: 'Scheduler Mail incoming',
                    html: this.createMailHTML(message, user),
                };
           sgMail.send(msg);                
        });
    };

    public sendPayload(payload) {
        let msg = new Amqp.Message(payload);
        EXCHANGE.send(msg, 'Q_CHANNEL_MAIL');
    }
    
    private getUserEmailByName(nameKey: string) {
        return (<any>members)[nameKey];
    }

    private createMailHTML(message: INotificationMessage, user) : string{
        let htmlBody =  `<strong>${message.text}</strong>`;

        message.actions.forEach(action => {
           htmlBody += `\n <a href="${MAIL_SERVICE_URL}?user=${user.name}&value=${action.value}&callback_id=${message.callback_id}">${action.text}</a>`
        });


        return htmlBody;
    }

}

export const emailService = new EmailService();