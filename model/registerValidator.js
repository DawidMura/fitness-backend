import { body, check } from "express-validator";
import MemberSchema from "./memberSchema.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

/*****************************************************
 * Registervalidator validiert alle Eingaben, die von Frontend als 
 * Input in Menberschema gesendet werden. Falls Input Ordungsgemäßt
 * eingegenben wurde, werden die Inputs in database gespeichert, ansonst
 * werden die Inputs in database nicht angenommen. 
 *******************************************************/
export const registerValidator = [
    body("firstName")
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage("first name has to be at least 2 chars"),
    body("lastName")
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage("last name has to be at least 3 chars"),

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
    // body("course_ids")
    //     .optional({ checkFalsy: true }),
    // body("device_ids")
    //     .optional({ checkFalsy: true }),
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

