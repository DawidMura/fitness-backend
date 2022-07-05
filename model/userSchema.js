import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Member from "./memberSchema.js";


// const Member = mongoose.model('Member', MemberSchema);

const UserSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Member
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


UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

/*
Modell wird hier  inizialisiert, dadurch kann man mit ihr
arbeiten */
export default mongoose.model("userPanel", UserSchema);