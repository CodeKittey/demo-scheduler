import {Service} from '../../service';
import {WebClient, IncomingWebhook, CLIENT_EVENTS, RtmClient} from '@slack/client';
import * as config from '../../config/config.json';
import * as Botkit from 'botkit';



const SLACK_WEBHOOK_URL = (<any>config).WEBHOOK_URL;
const BOT_TOKEN = (<any>config).BOT_TOKEN;
const BOT_CLIENT = (<any>config).BOT_CLIENT;
const BOT_SECRET = (<any>config).BOT_SECRET;
const BOT_VERFICATION_TOKEN = (<any>config).BOT_VERFICATION_TOKEN;
const BOT_USER_OAUTH_ACCESS_TOKEN = (<any>config).BOT_USER_OAUTH_ACCESS_TOKEN;
const OAUTH_ACCESS_TOKEN = (<any>config).OAUTH_ACCESS_TOKEN;

export class SlackService implements Service {
    private web:any = new WebClient(BOT_TOKEN);
    
    private webhook = new IncomingWebhook(SLACK_WEBHOOK_URL, {
            username: 'My custom username',
            iconEmoji: ':slack:',
    });


    public async list() {
                this.webhook.send({
                text: 'Some text',
                iconEmoji: ':robot_face:',
                channel: '#random',
                linkNames: '1',
                attachments: [
                            {
                                "text": "Choose a game to play",
                                "fallback": "You are unable to choose a game",
                                "callback_id": "wopr_game",
                                "color": "#3AA3E3",
                                "attachment_type": "default",
                                "actions": [
                                    {
                                        "name": "game",
                                        "text": "Chess",
                                        "type": "button",
                                        "value": "chess"
                                    },
                                    {
                                        "name": "game",
                                        "text": "Falken's Maze",
                                        "type": "button",
                                        "value": "maze"
                                    },
                                    {
                                        "name": "game",
                                        "text": "Thermonuclear War",
                                        "style": "danger",
                                        "type": "button",
                                        "value": "war",
                                        "confirm": {
                                            "title": "Are you sure?",
                                            "text": "Wouldn't you prefer a good game of chess?",
                                            "ok_text": "Yes",
                                            "dismiss_text": "No"
                                        }
                                    }
                                ]
                            }
                        ]
                });
    };
    
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

/*{
    "text": "Would you like to play a game?",
    "attachments": [
        {
            "text": "Choose a game to play",
            "fallback": "You are unable to choose a game",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "game",
                    "text": "Chess",
                    "type": "button",
                    "value": "chess"
                },
                {
                    "name": "game",
                    "text": "Falken's Maze",
                    "type": "button",
                    "value": "maze"
                },
                {
                    "name": "game",
                    "text": "Thermonuclear War",
                    "style": "danger",
                    "type": "button",
                    "value": "war",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "Wouldn't you prefer a good game of chess?",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }
            ]
        }
    ]
}
*/
