import { type NextFunction, type Request, type Response } from "express";

export function catchAsync(
  fn: (req: Request, res: Response, next: NextFunction) => any,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
