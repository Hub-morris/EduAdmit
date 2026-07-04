import { Router } from "express";
import { getUserProfile } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/me", authenticate, getUserProfile);

export default router;
