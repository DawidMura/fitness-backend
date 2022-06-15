import express from "express";
import { postRegister } from "../controller/auth-controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { registerSchema } from "../model/registerSchema.js";
const router = express.Router();

router.post(
    "/register",
    registerSchema,
    validateRequest,
    postRegister
);

export default router; 