"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const health_1 = require("./health");
const slack_1 = require("./slack");
exports.CONTROLLERS = [
    new health_1.HealthController(),
    new slack_1.SlackController()
];
//# sourceMappingURL=index.js.map