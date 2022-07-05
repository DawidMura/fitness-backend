import { body, check } from "express-validator";
import MemberSchema from "./memberSchema.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import IBAN from "iban";
/*****************************************************
 * Validierungskette  wird in express-validator 
 * Validiert. Das bedeutet, dass Sie jede dieser Methoden
 * verwenden können,  z.B. isEmail, etc.
 *******************************************************/
export const profileValidator = [
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
    // body("accountNumber")
    //     .custom((value, { req }) => {
    //         const checkIban = IBAN.isValid(req.body.accountNumber);
    //         // if(value !== req.body.accountNumber){
    //         //     throw new error("value and iban are not equal");
    //         // }

    //         return checkIban;
    //     })
    //     .trim()
    //     .withMessage("IBAN has contain a valid IBAN format"),
    body("mobile")
        .isNumeric()
        .custom((value, { req }) => {
            let mobile = req.body.mobile;

            let strMobile = mobile.toString();
            console.log(strMobile.length);
            if (strMobile.length === 11) return strMobile;
            throw new error("mobile must contain 11 digits");
        })
        .withMessage("mobile phone must have 11 digits "),
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



/* *************************************************
*  Erstellung einer  Collection Namens "MenberSchema
*  also, wir legen unsere Modelle bzw. unsere Datenstruktur fest, die
*  wir während der Entwicklung brauchen.
*  Damit kann man Daten manipulieren z.B: ( CRUD, usw)
******************************************************/
