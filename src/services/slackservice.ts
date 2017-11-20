import {Service} from './service';
import {WebClient, IncomingWebhook, CLIENT_EVENTS, RtmClient} from '@slack/client';


//test: https://www.npmjs.com/package/slack-mock

const SLACK_WEBHOOK_URL = '';
const BOT_TOKEN = '';

export class SlackService implements Service {
   /* private token:string =  ''
    private web:any = new WebClient(this.token);*/
    
    private webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);
    private rtm = new RtmClient(BOT_TOKEN);

    public async list() {
        this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
            console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
        });
        
        this.rtm.start();
        /*this.webhook.send('Hello there', function(err, res) {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('Message sent: ', res);
            }
        });*/
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
