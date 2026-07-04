import type { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    const result = await registerUser({ email, password, name });

    return res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
