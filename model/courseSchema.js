import mongoose from "mongoose";
import Member from "./memberSchema.js";

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
    complete: {
        type: Boolean,
        default: false,
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

    // numOfMembers: {
    //     type: Number,
    //     min: 0,
    //     max: 10,
    // }

    // slots (limit) weiter machen
    // slots: [{
    //     type: mongoose.Schema.Types.Mixed,
    //     ref: 'reservation',
    //     maxItems: 10
    // }]
})

export default mongoose.model("Course", CourseSchema);