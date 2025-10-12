import pino from "pino";
global.logger = pino({
  transport: {
    targets: [
      {
        target: "pino-pretty",
      },
    ],
  },
});
