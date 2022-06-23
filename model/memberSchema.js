import mongoose from "mongoose";
import bcrypt from "bcrypt";


/* *************************************************
*  Erstellung einer  Collection Namens "MenberSchema
*  also, wir legen unsere Modelle bzw. unsere Datenstruktur fest, die
*  wir während der Entwicklung brauchen.
*  Damit kann man Daten manipulieren z.B: ( CRUD, usw)
******************************************************/

const MemberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    // role: {
    //     type: String,
    // },
    // refreshToken in DB speichern oder nicht?
    refreshToken: String,

    address:
    {
        street: {
            type: String,
            required: true,
        },

        number: {
            type: Number,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },

        zip: {
            type: Number,
            required: true,
        },
    }
});
/**********************************************************
 * vor der Speicherung in database wird das Modell
 * geprüft /gefangen,es wird  nur Funktion(wegen class) genutzt.
 * Dieses Middleware wird auf Schemaebene definiert,  und kann die Abfrage während des
 * Ausführung ändern,  allso wird das password beim Instanzieren gehasched, bevor es 
 * das Model erstellt wird 
*****************************************************************/


MemberSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

/*
Modell wird hier  inizialisiert, dadurch kann man mit ihr
arbeiten */
export default mongoose.model("Member", MemberSchema);
