import express from "express";
import { postRegister, postLogin, logout } from "../controller/auth-controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { registerSchema } from "../model/registerSchema.js";
import { loginSchema } from "../model/loginSchema.js";

const router = express.Router();

router.post(
    "/register",
    registerSchema,
    validateRequest,
    postRegister
);


router.post("/login",
    loginSchema,
    validateRequest,
    postLogin)

router.get("/logout",
    logout)

export default router; 