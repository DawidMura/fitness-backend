import express from "express";
import isAuth, { isAdmin } from "../middleware/is-auth.js";
import {
    getCourses, getOneCourse, addCourse, updateCourse, deleteCourse, joinCourse, showCourseInfo, addMemberToCourse
} from "../controller/course-controller.js";

import {
    getDevices, getOneDevice, addDevice, updateDevice, deleteDevice, showDevicesInfo, bookDevices, addMemberToDevice
} from "../controller/devices-controller.js";
import {
    getOneProfile, updateProfile, showProfileInfo, showEditProfileInfo, deleteProfile, addProfile, addProfileToMember
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
    .post(courseValidator, validateRequest, isAuth, isAdmin, addCourse)

router.route("/courses/:courseId")
    .get(isAuth, getOneCourse)

    .put(courseValidator, validateRequest, isAuth, isAdmin, updateCourse)
    .delete(isAuth, isAdmin, deleteCourse);

router.route("/showCourseInfo/:memberId")
    .get(isAuth, showCourseInfo);

router.route("/devices")
    .get(isAuth, getDevices)
    .post(devicesValidator, validateRequest, isAuth, isAdmin, addDevice);

router.route("/devices/:deviceId")
    .get(isAuth, getOneDevice)
    .put(devicesValidator, validateRequest, isAuth, isAdmin, updateDevice)
    .delete(isAuth, isAdmin, deleteDevice);

router.route("/showDevicesInfo/:memberId")
    .get(isAuth, showDevicesInfo);

router.route("/bookDevices/")
    // .post(isAuth, bookDevices, addMemberToDevice)
    .post(isAuth, devicesValidator, bookDevices, addMemberToDevice)

router.route("/edit/:memberId")
    .get(isAuth, getOneProfile)
    .put(
        isAuth,
        profileValidator,
        validateRequest,
        updateProfile
    )
    .delete(isAuth, isAdmin, deleteProfile)


router.route("/addProfile/:memberId")
    .post(addProfile);

router.route("/updateProfile")
    .post(updateProfile, addProfileToMember);

router.route("/info/:memberId")
    .get(isAuth, showProfileInfo);

router.route("/editInfo/:memberId")
    .get(isAuth, showEditProfileInfo);

router.route("/joinCourse/")
    // .post(isAuth, courseValidator, joinCourse, addMemberToCourse)
    .post(isAuth, courseValidator, joinCourse, addMemberToCourse)
router.route("/bookDevices/")
    .post(isAuth, devicesValidator, bookDevices, addMemberToDevice);



export default router;