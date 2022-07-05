import MemberSchema from "../model/memberSchema.js";

const getOneProfile = async (req, res) => {
    const _id = req.params.id;
    const findOneMember = await MemberSchema.findById(_id);
    res.json(findOneMember);
}


const updateProfile = async (req, res) => {
    const _id = req.params.id;
    await MemberSchema.updateOne({ _id }, req.body);
    res.json("Profile is updated!");
}

const showProfileInfo = async (req, res) => {
    try {
        const _id = req.params.id;
        const profileInfo = await MemberSchema.find({ _id })
            .select("firstName lastName -_id");
        // .populate("movie_id", "title -_id") // so würden wir nur den title vom Movie sehen

        res.json({ profileInfo });
    } catch (error) {
        console.error(error);
    }
}



export {
    getOneProfile, updateProfile, showProfileInfo
};