import { body } from "express-validator";

export const loginSchema = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Has to be valid email")
        .normalizeEmail(),
    body("password")
        .trim()
        .isLength()
        .withMessage("Password should'nt be empty")
];