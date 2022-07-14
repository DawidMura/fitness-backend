/***************************************************************
 * Diese Controller erstellt die Methode zur Datenangaben eines Users
 * Firstname, lastname, course und devices.
 * Außerdem kann User seine Daten bearbeiten und anderen daten dazu einfügen
 * wie Telefonnummer und Kontonummer
 * 
 * @getOneProfile gibt den user: firstname, lastname, course und devices. zurück * 
 * @updateprofile  damit wird die Userdaten bearbeitet und aktualisiert
 * @showProfileInfo gibt den user: firstname, lastname, course und devices zurück, dies
 *  wird durch Populate der Collections Menber, Devices and Course ermöglicht
 * @showEditProfileInfo ermöglicht die Populate der Collections, Member, Devices and Courses
 ****************************************************************/
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
            .populate("course_ids device_ids", "firstName lastName course_name device_name -_id")
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

const deleteProfile = async (req, res) => {
    const memberId = req.params.memberId;
    await MemberSchema.findByIdAndRemove(memberId);
    res.send("Member is deleted!");
}



export {
    getOneProfile, updateProfile, showProfileInfo, showEditProfileInfo, deleteProfile
};