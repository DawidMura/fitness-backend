import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Member from "./memberSchema.js";


/* *************************************************
*  Erstellung der Collection Namens "ProfileSchema
*  hierbei wird unsere Modele bzw. unsere Datenstruktur 
*  für alle Member festgelegt.
******************************************************/

// const Member = mongoose.model('Member', MemberSchema);

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Member"
    },

    mobile: {
        type: Number,
    },

    accountNumber: {
        type: String
    },

    updatedAt: {
        type: Date,
        default: () => new Date(),
    },

    strict: false
});


ProfileSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

/* Modell wird hier  inizialisiert */
export default mongoose.model("Profile", ProfileSchema);