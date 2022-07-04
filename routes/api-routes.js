import express from "express";
import isAuth from "../middleware/is-auth.js";
import {
    getCourses, getOneCourse, addCourse, updateCourse, deleteCourse
} from "../controller/course-controller.js";

import {
    getDevices, getOneDevice, addDevice, updateDevice, deleteDevice
} from "../controller/devices-controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { courseValidator } from "../model/courseValidator.js"
import { devicesValidator } from "../model/devicesValidator.js";

const router = express.Router()

// *** "Playground" ****
// callbacks sind hier nicht in controller ausgelagert

// Endpoint nur erreichbar, wenn authorisiert
router.get("/userPanel", isAuth, (req, res) => {
    res.json({
        success: true
    });
})

router.route("/courses")
    .get(getCourses)
    .post(courseValidator, validateRequest, isAuth, addCourse);

router.route("/courses/:id")
    .get(getOneCourse)
    .put(courseValidator, validateRequest, isAuth, updateCourse)
    .delete(isAuth, deleteCourse);

router.route("/devices")
    .get(getDevices)
    .post(devicesValidator, validateRequest, isAuth, addDevice);

router.route("/devices/:id")
    .get(getOneDevice)
    .put(devicesValidator, validateRequest, isAuth, updateDevice)
    .delete(isAuth, deleteDevice);


export default router;

