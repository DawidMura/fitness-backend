import express from "express";
import { postRegister, postLogin, postLogout, postRefreshToken } from "../controller/auth-controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { registerValidator } from "../model/registerValidator.js"
import { loginValidator } from "../model/loginValidator.js"

const router = express.Router();

router.post(
    "/register",
    registerValidator,
    validateRequest,
    postRegister
);


router.post("/login",
    loginValidator,
    validateRequest,
    postLogin)


router.post("/refreshToken", postRefreshToken);
router.post("/logout",
    postLogout)

export default router; 