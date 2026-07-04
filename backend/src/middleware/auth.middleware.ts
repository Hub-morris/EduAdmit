import type { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/token.js";
import { ApiError } from "../utils/apiError.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new ApiError("Authentication credentials were not provided.", 401, false));
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const payload = verifyJwt<{ id: string; email: string }>(token);
    req.user = payload;
    next();
  } catch (error) {
    return next(new ApiError("Invalid or expired token.", 401, false));
  }
};
