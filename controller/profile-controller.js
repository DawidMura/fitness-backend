import CourseSchema from "../model/courseSchema.js";
import MemberSchema from "../model/memberSchema.js";

const getOneProfile = async (req, res) => {
    const _id = req.params.id;
    const findOneMember = await MemberSchema.findById(_id);
    res.json(findOneMember);
}


const joinCourse = async (req, res) => {
    const _id = req.params.id;
    try {
        await CourseSchema.updateOne({ _id }, req.body.ready);
        if (req.body.ready) {
            res.json("You're joined to course");
        }
        else {
            res.json("You're not joined to course");
        }

    }
    catch (error) {
        console.error(error)
    }

}

const updateProfile = async (req, res) => {
    const _id = req.params.id;
    await MemberSchema.updateOne({ _id }, req.body);
    res.json("Profile is updated!");
}

const showProfileInfo = async (req, res) => {
    try {
        const _id = req.params.id;
        console.debug(_id);
        const profileInfo = await MemberSchema.find({ _id })
            .populate("course_id device_id", "firstName lastName course_name device_name -_id")
            .select("firstName lastName course_name device_name")
        res.json({ profileInfo });
    } catch (error) {
        console.error(error);
    }
}

async function showAllProfilesPopulated() {
    try {
        const profilesPop = await MemberSchema.find({})
            .populate("devices")

    }
    catch (error) {
        console.error(error);
    }
}

export {
    getOneProfile, updateProfile, showProfileInfo, showAllProfilesPopulated, joinCourse
};