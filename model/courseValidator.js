import { body, check } from "express-validator";

/*****************************************************
 * Validierungskette  wird in express-validator 
 * Validiert. Das bedeutet, dass Sie jede dieser Methoden
 * verwenden können,  z.B. isEmail, etc.
 *******************************************************/
export const courseValidator = [
    body("name")
        .isString()
        .escape()
        .trim()
        .withMessage("Course has to be a string"),
    body("trainer")
        .isString()
        .escape()
        .trim()
        .withMessage("Trainer has to be a string")
];
