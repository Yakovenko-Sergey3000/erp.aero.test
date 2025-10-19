import type TokenService from "../modules/token/token-service.ts";
import type { NextFunction, Request, Response } from "express";

export function setTokenServiceMiddleware(tokenService: TokenService) {
  return (req: Request, _: Response, next: NextFunction) => {
    req.tokenService = tokenService;
    next();
  };
}
