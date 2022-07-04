import { body, check } from "express-validator";

/*****************************************************
 * Validierungskette  wird in express-validator 
 * Validiert. Das bedeutet, dass Sie jede dieser Methoden
 * verwenden können,  z.B. isEmail, etc.
 *******************************************************/
export const devicesValidator = [
    body("name")
        .isString()
        .escape()
        .trim()
        .withMessage("Device has to be a string"),
];
