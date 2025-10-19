"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pino_1 = require("pino");
// @ts-ignore
global.logger = (0, pino_1.default)({
    transport: {
        targets: [
            {
                target: "pino-pretty",
            },
        ],
    },
});
