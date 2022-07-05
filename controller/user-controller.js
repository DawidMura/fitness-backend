import UserSchema from "../model/userSchema.js";

const getOneUser = async (req, res) => {
    const _id = req.params.id;
    const findOneUser = await UserSchema.findById(_id);
    res.json(findOneUser);
}


const updateUser = async (req, res) => {
    const _id = req.params.id;
    await UserSchema.updateOne({ _id }, req.body);
    res.json("user is updated!");
}

const showUserPanel = async (req, res) => {
    try {
        const userPop = await UserSchema.find({})
            .populate("user_id", "firstName, lastName")
            .select("firstName, lastName");
        // .populate("movie_id", "title -_id") // so würden wir nur den title vom Movie sehen

        console.log("\n***** Populated User *****");
        console.log(JSON.stringify(userPop, null, 2));
    } catch (error) {
        console.error(error);
    }
}



export {
    getOneUser, updateUser, showUserPanel
};