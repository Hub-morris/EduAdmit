import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signJwt = (payload: object) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

export const verifyJwt = <T>(token: string): T =>
  jwt.verify(token, env.jwtSecret) as T;
