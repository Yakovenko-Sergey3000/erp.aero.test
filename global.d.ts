import pino from "pino";
import type { UUIDTypes } from "uuid";
import type TokenService from "./modules/token/token-service.ts";

declare global {
  var logger: ReturnType<typeof pino>;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: UUIDTypes;
      email: string | undefined;
      phone: string | undefined;
    };
    errors?: string[];
    fingerprint: string;
    tokenService: TokenService;
  }
}
