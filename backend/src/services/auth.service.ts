import prisma from "../config/database.js";
import { ApiError } from "../utils/apiError.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { signJwt } from "../utils/token.js";

interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const registerUser = async ({ email, password, name }: RegisterInput) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new ApiError("Email already in use.", 409, false);
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  const token = signJwt({ id: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
  };
};

export const loginUser = async ({ email, password }: LoginInput) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError("Invalid credentials.", 401, false);
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new ApiError("Invalid credentials.", 401, false);
  }

  const token = signJwt({ id: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
  };
};
