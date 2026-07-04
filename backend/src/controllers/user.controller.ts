import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { getUserById } from "../services/user.service.js";

export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserById(req.user?.id as string);

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
