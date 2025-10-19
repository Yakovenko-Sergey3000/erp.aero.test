import ApiError from "../errors/api-error.ts";
import type { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.debug(err);

  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, errors: err.errors });
  }

  res.status(500).json({
    message: "Internal Server Error",
    "error.message": err.message,
    error: err,
  });

  return;
};
