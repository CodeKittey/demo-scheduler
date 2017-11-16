"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@slack/client");
class SlackService {
    constructor() {
        this.token = 'xoxp-274493794343-273555581077-272874741008-c42311205cd324dfcc441f33a4523ff2'; //see section above on sensitive data
        this.web = new client_1.WebClient(this.token);
    }
    async list() {
        await this.web.channels.list(function (err, info) {
            if (err) {
                console.log('Error:', err);
            }
            else {
                for (var i in info.channels) {
                    console.log(info.channels[i].name);
                }
            }
        });
    }
}
exports.SlackService = SlackService;
exports.slackService = new SlackService();
//# sourceMappingURL=slackservice.js.map