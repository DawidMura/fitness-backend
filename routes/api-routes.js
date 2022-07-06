import express from "express";
import isAuth from "../middleware/is-auth.js";
import {
    getCourses, getOneCourse, addCourse, updateCourse, deleteCourse
} from "../controller/course-controller.js";

import {
    getDevices, getOneDevice, addDevice, updateDevice, deleteDevice
} from "../controller/devices-controller.js";
import {
    getOneProfile, updateProfile, showProfileInfo, showAllProfilesPopulated, joinCourse
} from "../controller/profile-controller.js";

import {
    profileValidator
} from "../model/profileValidator.js";

import { validateRequest } from "../middleware/validateRequest.js";
import { courseValidator } from "../model/courseValidator.js"
import { devicesValidator } from "../model/devicesValidator.js";
// import { userValidator } from "../model/userValidator.js";
// import { getOneUser, updateUser, showUserPanel } from "../controller/user-controller.js";

const router = express.Router()

// *** "Playground" ****
// callbacks sind hier nicht in controller ausgelagert

// Endpoint nur erreichbar, wenn authorisiert

router.get("/userPanel", isAuth, (req, res) => {
    res.json({
        success: true
    });
})




// router.route("/userPanel/:id")
//     .get(isAuth, getOneUser, showUserPanel)
//     .put(userValidator, validateRequest, isAuth, updateUser);


router.route("/courses")
    .get(isAuth, getCourses)
    .post(courseValidator, validateRequest, isAuth, addCourse);

router.route("/courses/:id")
    .get(isAuth, getOneCourse)
    .put(courseValidator, validateRequest, isAuth, updateCourse)
    .delete(isAuth, deleteCourse);

router.route("/devices")
    .get(isAuth, getDevices)
    .post(devicesValidator, validateRequest, isAuth, addDevice);

router.route("/devices/:id")
    .get(isAuth, getOneDevice)
    .put(devicesValidator, validateRequest, isAuth, updateDevice)
    .delete(isAuth, deleteDevice);


router.route("/edit/:id")
    .get(isAuth, getOneProfile)
    .put(
        profileValidator,
        validateRequest,
        isAuth,
        updateProfile
    )

router.route("/info/:id")
    .get(isAuth, showProfileInfo)

router.route("/profile/:id")
    .get(isAuth, showAllProfilesPopulated)



//POST ROUTES
router.route("/joinCourse/:id")
    .post(isAuth, joinCourse)

export default router;

