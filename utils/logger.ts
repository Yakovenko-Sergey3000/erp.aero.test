import pino from "pino";
// @ts-ignore
global.logger = pino({
  transport: {
    targets: [
      {
        target: "pino-pretty",
      },
    ],
  },
});
