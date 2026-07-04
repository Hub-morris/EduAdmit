import prisma from "../config/database.js";
import { ApiError } from "../utils/apiError.js";

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new ApiError("User not found.", 404, false);
  }

  return user;
};
