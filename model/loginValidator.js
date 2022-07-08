import { body } from "express-validator";

/*****************************************************
 * Loginvalidator validiert die Email und Password, die
 * vom User beim Einloggen eingegeben hat, wenn sie angenommen werden, 
 * kann  sich User einloggen   
 *******************************************************/
export const loginValidator= [
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