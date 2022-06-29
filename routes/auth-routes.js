import express from "express";
import { postRegister, postLogin, postLogout } from "../controller/auth-controller.js";
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


router.post("/login", // erzeugt httponly cookie mit access token
    loginValidator,
    validateRequest,
    postLogin)


// router.post("/refreshToken", postRefreshToken);
router.post("/logout",
    postLogout) // server löscht cookie mit access token

// Geschütze routes mit accessToken Beispiel:

// isAuth => muss man jwt.verify() bentuzen für accessToken zu überprüfen
//router.post("/userPanel", isAuth, postUserPanel)

export default router; 