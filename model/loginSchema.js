import { body } from "express-validator";

export const loginSchema = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Has to be valid email")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 5 })
        .withMessage("Has to have at least 5 characters"),
];