import express from "express";
import isAuth from "../middleware/is-auth.js";
import {
    getCourses, getOneCourse, addCourse, updateCourse, deleteCourse
} from "../controller/course-controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { courseValidator } from "../model/courseValidator.js"

const router = express.Router()

// *** "Playground" ****
// callbacks sind hier nicht in controller ausgelagert

// router.post("/json", (req, res) => {
//   res.json({success:true, dataaaa: {email: req.body.email, pwd: req.body.pwd }});
// })

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



export default router;

