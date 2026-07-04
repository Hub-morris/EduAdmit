import morgan from "morgan";
import type { Request, Response, NextFunction } from "express";

export const requestLogger = morgan("combined", {
  skip: (_, res) => res.statusCode < 400,
});

export const errorLogger = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  next(error);
};
