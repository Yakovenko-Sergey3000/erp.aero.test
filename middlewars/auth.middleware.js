import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../configs/config.ts";
import ApiError from "../utils/api-error.js";

export async function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(ApiError.UnauthorizedError());
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(ApiError.UnauthorizedError());
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);

    req.user = {
      id: decoded.id,
    };

    const refreshToken = await req.tokenService.getTokenByUserId(
      req.user.id,
      req.ip
    );

    if (!refreshToken) {
      return next(ApiError.UnauthorizedError());
    }

    next();
  } catch (e) {
    next(ApiError.UnauthorizedError());
  }
}
