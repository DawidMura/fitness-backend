import mongoose from "mongoose";
import bcrypt from "bcrypt";
// require('mongoose-iban').loadType(mongoose);


/* *************************************************
*  Erstellung einer  Collection Namens "MenberSchema
*  also, wir legen unsere Modelle bzw. unsere Datenstruktur fest, die
*  wir während der Entwicklung brauchen.
*  Damit kann man Daten manipulieren z.B: ( CRUD, usw)
******************************************************/

// const checkIban = IBAN.isValid('BE68539007547034');
// console.log(checkIban);

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

    roles: {
        type: [String],
        enum: ["user", "trainer", "admin"],
        default: ["user"]
    },

    createdAt: {
        type: Date,
        default: () => new Date(),
        immutable: true,
    },

    updatedAt: {
        type: Date,
        default: () => new Date(),
    },

    mobile: {
        type: Number,
    },

    accountNumber: {
        type: String
    },

    // courses: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Course'
    //     }
    // ],

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
