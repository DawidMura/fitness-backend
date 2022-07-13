import mongoose from "mongoose";
import Member from "./memberSchema.js";


/* *************************************************
*  Erstellung der Collection Namens "CourseSchema
*  hierbei wird unsere Modele bzw. unsere Datenstruktur 
*  für alle Kurse festgelegt.
******************************************************/

const CourseSchema = new mongoose.Schema({
    member: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Member"
    },
    course_name: {
        type: String,
        required: true,
        immutable: true,
    },
    trainer: {
        type: String,
        required: true,
    },

    memberQuantity: {
        type: Number,
        min: 1,
        max: 10
    },

    created_at: {
        type: Date,
        default: () => new Date(),
        immutable: true,
    },
    updated_at: {
        type: Date,
        default: () => new Date(),
        immutable: true,
    },
    begin: {
        type: Date,
        default: () => new Date('2022-06-22:11:00'),
        immutable: true,
    },

    end: {
        type: Date,
        default: () => new Date('2022-06-22:12:00'),
        immutable: true,
    },

})

export default mongoose.model("Course", CourseSchema);