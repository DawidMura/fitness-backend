import { body, check } from "express-validator";

/*****************************************************
 * Coursevalidator validiert alle Kurse, die vom Admin erstellt
 * worden sind. Falls sie Ordungsgemäßt
 * eingegenben wurden, werden sie in database gespeichert, ansonst
 * werden sie in database nicht angenommen. 
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
