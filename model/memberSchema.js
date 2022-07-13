import mongoose from "mongoose";
import bcrypt from "bcrypt";
// require('mongoose-iban').loadType(mongoose);
import Course from "./courseSchema.js";
import Device from "./devicesSchema.js";
import Profile from "./profileSchema.js";

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

    roles: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    course_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ],

    // später die gleiche Änderung wie be course_ids !!!
    device_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Device"
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
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

/* Modell wird hier  inizialisiert */
export default mongoose.model("Member", MemberSchema);
