import { body, check } from "express-validator";

/*****************************************************
 * Devicesvalidator validiert alle Devices, die vom Admin erstellt
 * worden sind. Falls sie Ordungsgemäßt
 * eingegenben wurden, werden sie in database gespeichert, ansonst
 * werden sie in database nicht angenommen. 
 *******************************************************/

export const devicesValidator = [
    body("name")
        .isString()
        .escape()
        .trim()
        .withMessage("Device has to be a string"),
];
