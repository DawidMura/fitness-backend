import mongoose from "mongoose";
import bcrypt from "bcrypt";
// require('mongoose-iban').loadType(mongoose);
import Course from "./courseSchema.js";
import Device from "./devicesSchema.js";
import Profile from "./profileSchema.js";
import arrayUniquePlugin from "mongoose-unique-array";
/* *************************************************
*  Erstellung der Collection Namens "MemberSchema
*  hierbei wird unsere Modele bzw. unsere Datenstruktur 
*  für die Registrierung aller Members festgelegt.
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

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    course_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            unique: true,
        }
    ],

    // später die gleiche Änderung wie be course_ids !!!
    device_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Device",
            unique: true,
        }
    ],

    user_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        }
    ],

    createdAt: {
        type: Date,
        default: () => new Date(),
        immutable: true,
    },

    updatedAt: {
        type: Date,
        default: () => new Date(),
    },
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
    },
    strict: false
});


MemberSchema.pre("save", async function (next) {
    //Wenn 'password' nicht geändert wurde, isModified() function führt die next() aus.
    // Ansonst wird middleware "pre" ausgeführt und "password" noch einmal gehasht.
    // Wenn MongoDb neue object erstellt (z.b. user ist registriert), kann "this" operator zum bestimmten funktionen benutzen
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Attach the plugin to the schema
MemberSchema.plugin(arrayUniquePlugin);

/* Modell wird hier  inizialisiert */
export default mongoose.model("Member", MemberSchema);
