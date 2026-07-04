import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signJwt = (payload: object) =>
  jwt.sign(payload as any, env.jwtSecret as any, { expiresIn: env.jwtExpiresIn } as any);

export const verifyJwt = <T>(token: string): T =>
  jwt.verify(token, env.jwtSecret) as T;
