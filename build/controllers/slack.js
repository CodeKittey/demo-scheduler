"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slackservice_1 = require("../services/slackservice");
class SlackController {
    initialize(apiServer) {
        apiServer.get('slack/list', this.list.bind(this));
    }
    async list(req, res) {
        res.send(await slackservice_1.slackService.list());
    }
}
exports.SlackController = SlackController;
//# sourceMappingURL=slack.js.map