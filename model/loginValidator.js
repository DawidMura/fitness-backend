import { body } from "express-validator";

/*****************************************************
 * Validierungskette  wird in express-validator 
 * Validiert. Das bedeutet, dass Sie jede dieser Methoden
 * verwenden können,  z.B. trim(), etc.
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