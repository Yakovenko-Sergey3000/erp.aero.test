import type { NextFunction, Request, Response } from "express";
import { BadRequest } from "../errors/index.ts";

export const setFingerprintMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const fingerprint = req.header("x-fingerprint");

  if (fingerprint == undefined || fingerprint.length === 0) {
    logger.debug({
      where: "AuthController.signup",
      message: `user ${req.body.login} - fingerprint is not defined`,
    });

    next(new BadRequest("Missing x-fingerprint header"));
    return;
  }

  req.fingerprint = fingerprint;
  next();
};
