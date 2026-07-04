import { ZodError, type ZodTypeAny } from "zod";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError.js";

export const validate = (schema: ZodTypeAny) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formatted = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: formatted,
      });
    }
    next(error);
  }
};
