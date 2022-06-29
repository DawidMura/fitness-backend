import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    yoga: {
        type: [String],
        enum: ["yoga-1", "yoga-2", "yoga-3"]
    },

    zumba: {
        type: [String],
        enum: ["zumba-1", "zumba-2", "zumba-3"]
    },
    // selbstverteidugung DE=> selfDefense ENG
    selfDefense: {
        type: [String],
        enum: ["selfDefense-1", "selfDefense-2", "selfDefense-3"]
    },
    created_at: {
        type: Date,
        default: () => new Date(),
        immutable: true,
    },

    begin: {
        type: Date,
        default: () => new Date(),
        immutable: true,
    },

    hourTime: {
        type: Date,
        default: () => new Date(),
        immutable: true,
    },
    complete: {
        type: Boolean,
    },

    trainer: {
        type: "String",
    }
})

export default mongoose.model("course", CourseSchema);