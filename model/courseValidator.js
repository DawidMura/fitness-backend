import { body, check } from "express-validator";
import CourseSchema from "./courseSchema.js";


/*****************************************************
 * Validierungskette  wird in express-validator 
 * Validiert. Das bedeutet, dass Sie jede dieser Methoden
 * verwenden können,  z.B. isEmail, etc.
 *******************************************************/
export const courseValidator = [
    body("yoga")
        .notEmpty()
        .trim()
        .escape(),
    body("zumba")
        .notEmpty()
        .trim()
        .escape(),
    body("selfDefense")
        .notEmpty()
        .trim()
        .escape(),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Has to be valid email")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 5 })
        .withMessage("Password has to be at least 5 chars")
        .matches(/\d/)
        .withMessage('must contain a number'),
    body('repassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                //throw new error ...
                throw new error("pwd and rpwd are not equal");
            }
            return true;
        })
        .withMessage("pwd and rpwd are not equal"),
    body("age")
        .isNumeric({ min: 18, max: 70 })
        .withMessage("Age has to be between 18 and 70"),
    check("address.street")
        .isString()
        .escape()
        .trim()
        .withMessage("The street may to be valid street"),
    check("address.city")
        .isString()
        .escape()
        .trim()
        .withMessage("The city has to be a string"),
    check("address.zip")
        .isNumeric()
        .isLength({ min: 5 })
        .withMessage("Invalid zip")
];
