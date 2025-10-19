import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../configs/config.ts";
import type { NextFunction, Request, Response } from "express";
import { Unauthorized } from "../errors/index.ts";
import type { TokenPayload } from "../modules/token/types.ts";

export async function isAuthenticated(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.debug({
      where: "AuthController.signin",
      message: `Bearer is not defined`,
    });

    return next(new Unauthorized());
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    logger.debug({
      where: "AuthController.signin",
      message: `Bearer token is not correct`,
    });
    return next(new Unauthorized());
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as TokenPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      phone: decoded.phone,
    };

    const refreshToken = await req.tokenService.getTokenByUser({
      userId: req.user.id,
      fingerprint: req.fingerprint,
    });

    if (!refreshToken) {
      return next(new Unauthorized());
    }

    next();
  } catch (e) {
    return next(new Unauthorized());
  }
}
