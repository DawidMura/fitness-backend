/***************************************************************
 * Diese Controller erstellt die Methode zur Erstellung eines Kurses,
 * Löschen, usw. * 
 * @getCourses gibt bei einer Anfrage aller Kursen zurück
 * @getOneCourse gibt bei einer Anfrage einen Kurs zurück
 * @joinCourse gibt die Bestätigung zur Teilnahme eines Kurses,  * 
 * @showCourseInfoCourse gibt bei einer Anfrage die von dem User
 *  ausgewählte Courses
 * @addCourse hier wird einen neuen Kurs hinzugefügt
 * @updateCourse hier wird einen vorhandenen Kurs aktualisiert
 * @deleteCourse damit  wird einen vorhanden Kurs gelöscht
 ****************************************************************/

import CourseSchema from "../model/courseSchema.js";
import MemberSchema from "../model/memberSchema.js";

const getCourses = async (req, res) => {
    const courses = await CourseSchema.find();
    res.status(200).send(courses);
}

const getOneCourse = async (req, res) => {
    const courseId = req.params.courseId;
    const findCourse = await CourseSchema.findById(courseId);
    res.send(findCourse);
}

const joinCourse = async (req, res) => {
    const memberId = req.params.memberId;
    try {
        await MemberSchema.updateOne({ _id: memberId }, { course_ids: req.body.courses });
        res.send("Your'e joined to  course")
    }
    catch (error) {
        console.error(error)
    }

}

const showCourseInfo = async (req, res) => {
    try {
        const memberId = req.params.memberId;
        const courses = await MemberSchema.find({ _id: memberId })
            .populate("course_ids")
            .select("course_name trainer complete -_id")
        res.json({ courses });
    } catch (error) {
        console.error(error);
    }
}


const addCourse = async (req, res) => {
    const newCourse = new CourseSchema(req.body);
    await newCourse.save();
    res.send("new course is added");
}

const updateCourse = async (req, res) => {
    const courseId = req.params.courseId;
    await CourseSchema.updateOne({ _id: courseId }, req.body);
    res.send("course is updated!");
}

const deleteCourse = async (req, res) => {
    const courseId = req.params.courseId;
    await CourseSchema.findByIdAndRemove(courseId);
    res.send("course is deleted!");
}


export {
    getCourses, getOneCourse, addCourse, updateCourse, deleteCourse, joinCourse, showCourseInfo
};