import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Member from "./memberSchema.js";
import Course from "./courseSchema.js";
import Devices from "./devicesSchema.js";

// const Member = mongoose.model('Member', MemberSchema);

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Member
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
/**********************************************************
 * vor der Speicherung in database wird das Modell
 * geprüft /gefangen,es wird  nur Funktion(wegen class) genutzt.
 * Dieses Middleware wird auf Schemaebene definiert,  und kann die Abfrage während des
 * Ausführung ändern,  allso wird das password beim Instanzieren gehasched, bevor es 
 * das Model erstellt wird 
*****************************************************************/


ProfileSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

/*
Modell wird hier  inizialisiert, dadurch kann man mit ihr
arbeiten */
export default mongoose.model("Profile", ProfileSchema);