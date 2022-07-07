import MemberSchema from "../model/memberSchema.js";

const getOneProfile = async (req, res) => {
    const memberId = req.params.memberId;
    const findOneMember = await MemberSchema.findById(memberId);
    res.send(findOneMember);
}

const updateProfile = async (req, res) => {
    const memberId = req.params.memberId;
    await MemberSchema.updateOne({ _id: memberId }, req.body);
    res.send("Profile is updated!");
}

const showProfileInfo = async (req, res) => {
    try {
        const memberId = req.params.memberId;
        const profileInfo = await MemberSchema.find({ _id: memberId })
            .populate("course_ids", "firstName lastName course_name device_name -_id")
            .select("firstName lastName course_name device_name -_id")
        res.send(profileInfo);
    } catch (error) {
        console.error(error);
    }
}

const showEditProfileInfo = async (req, res) => {
    try {
        const memberId = req.params.memberId;
        const editInfo = await MemberSchema.find({ _id: memberId })
            .populate("course_ids", "firstName lastName course_name device_name -_id")
            .find({});
        res.send(editInfo);
    }
    catch (error) {
        console.error(error);
    }
}


export {
    getOneProfile, updateProfile, showProfileInfo, showEditProfileInfo
};