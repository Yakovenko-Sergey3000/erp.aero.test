import pino from "pino";

declare global {
  var logger: ReturnType<typeof pino>;
}
