"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HealthController {
    initialize(apiServer) {
        apiServer.get('ping', (req, res) => res.send(200, 'hello'));
    }
}
exports.HealthController = HealthController;
//# sourceMappingURL=health.js.map