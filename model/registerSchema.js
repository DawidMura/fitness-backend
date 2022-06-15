import { body, check } from "express-validator";
import MemberSchema from "../model/memberSchema.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export const registerSchema = [
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
        // .custom(email => {
        //     return MemberSchema.findUserByEmail(email)
        // })
        .withMessage("Has to be valid email")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 5 })
        .withMessage("Password has to be at least 5 chars"),
    body("age")
        .isNumeric({ min: 18, max: 70 })
        .withMessage("Age has to be between 18 and 70"),
    check("address.street")
        .escape()
        .trim()
        .isString()
        .withMessage("The street may to be valid street"),
    check("address.city")
        .escape()
        .trim()
        .isString()
        .withMessage("The city has to be a string"),
    check("address.zip")
        .isNumeric()
        .isLength({ min: 5 })
        .withMessage("Zip is not valid"),
];