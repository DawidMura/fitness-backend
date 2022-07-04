import CourseSchema from "../model/courseSchema.js";

const getCourses = async (req, res) => {
    const courses = await CourseSchema.find();
    res.status(200).send(courses);
}

const getOneCourse = async (req, res) => {
    const _id = req.params.id;
    const findCourse = await CourseSchema.findById(_id);
    res.json(findCourse);
}


const addCourse = async (req, res) => {
    const newCourse = new CourseSchema(req.body);
    await newCourse.save();
    res.json("new course is added");
}

const updateCourse = async (req, res) => {
    const _id = req.params.id;
    await CourseSchema.updateOne({ _id }, req.body);
    res.json("course is updated!");
}

const deleteCourse = async (req, res) => {
    const _id = req.params.id;
    await CourseSchema.findByIdAndRemove(_id);
    res.send("course is deleted!");
}

export {
    getCourses, getOneCourse, addCourse, updateCourse, deleteCourse
};