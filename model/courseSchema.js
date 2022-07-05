import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
        default: () => new Date('2022-06-22:11:00').getFullYear(),
        immutable: true,
    },

    end: {
        type: Date,
        default: () => new Date('2022-06-22:12:00').toLocaleDateString(),
        immutable: true,
    },
})

export default mongoose.model("Course", CourseSchema);