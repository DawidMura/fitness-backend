import express from "express";
import isAuth from "../middleware/is-auth.js";
import {
    getCourses, getOneCourse, addCourse, updateCourse, deleteCourse, joinCourse, showCourseInfo, addMemberToCourse
} from "../controller/course-controller.js";

import {
    getDevices, getOneDevice, addDevice, updateDevice, deleteDevice, showDevicesInfo, bookDevices, addMemberToDevice
} from "../controller/devices-controller.js";
import {
    getOneProfile, updateProfile, showProfileInfo, showEditProfileInfo
} from "../controller/profile-controller.js";

import {
    profileValidator
} from "../model/profileValidator.js";

import { validateRequest } from "../middleware/validateRequest.js";
import { courseValidator } from "../model/courseValidator.js"
import { devicesValidator } from "../model/devicesValidator.js";

const router = express.Router()

router.get("/userPanel", isAuth, (req, res) => {
    res.json({
        success: true
    });
})


router.route("/courses")
    .get(isAuth, getCourses)
    .post(courseValidator, validateRequest, isAuth, addCourse)

router.route("/courses/:courseId")
    .get(isAuth, getOneCourse)

    .put(courseValidator, validateRequest, isAuth, updateCourse)
    .delete(isAuth, deleteCourse);

router.route("/showCourseInfo/:memberId")
    .get(isAuth, showCourseInfo);

router.route("/devices")
    .get(isAuth, getDevices)
    .post(devicesValidator, validateRequest, isAuth, addDevice);

router.route("/devices/:deviceId")
    .get(isAuth, getOneDevice)
    .put(devicesValidator, validateRequest, isAuth, updateDevice)
    .delete(isAuth, deleteDevice);

router.route("/showDevicesInfo/:memberId")
    .get(isAuth, showDevicesInfo);

router.route("/bookDevices/")
    // .post(isAuth, bookDevices, addMemberToDevice)
    .post(devicesValidator, bookDevices, addMemberToDevice)

router.route("/edit/:memberId")
    .get(getOneProfile)
    // .put(
    //     profileValidator,
    //     validateRequest,
    //     isAuth,
    //     updateProfile
    // )

    .put(
        profileValidator,
        validateRequest,
        // isAuth,
        updateProfile
    )


router.route("/info/:memberId")
    .get(isAuth, showProfileInfo);

router.route("/editInfo/:memberId")
    .get(showEditProfileInfo);

router.route("/joinCourse/")
    .post(courseValidator, joinCourse, addMemberToCourse)

// router.route("/addMemberToCourse")
//     .put(addMemberToCourse)

export default router;

router.route("/bookDevices/")
    // .post(isAuth, bookDevices, addMemberToDevice)
    .post(devicesValidator, bookDevices, addMemberToDevice)