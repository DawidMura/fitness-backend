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
        default: () => new Date('2022-06-22:11:00').toString(),
        immutable: true,
    },

    end: {
        type: Date,
        default: () => new Date('2022-06-22:12:00'),
        immutable: true,
    },
    // yoga: {
    //     // enum: ["yoga-1", "yoga-2", "yoga-3"],
    //     trainer: {
    //         type: String,
    //         required: true
    //     },

    //     created_at: {
    //         type: Date,
    //         default: () => new Date(),
    //         immutable: true,
    //     },

    //     begin: {
    //         type: Date,
    //         default: () => new Date(),
    //         immutable: true,
    //     },

    //     hourTime: {
    //         type: Date,
    //         default: () => new Date(),
    //         immutable: true,
    //     },
    //     complete: {
    //         type: Boolean,
    //     },
    // },

    // zumba: {
    //     // enum: ["zumba-1", "zumba-2", "zumba-3"],
    //     trainer: {
    //         type: String,
    //         required: true
    //     },

    //     created_at: {
    //         type: Date,
    //         default: () => new Date(),
    //         immutable: true,
    //     },

    //     begin: {
    //         type: Date,
    //         default: () => new Date(),
    //         immutable: true,
    //     },

    //     hourTime: {
    //         type: Date,
    //         default: () => new Date(),
    //         immutable: true,
    //     },
    //     complete: {
    //         type: Boolean,
    //     },
    // },
    // // selbstverteidugung DE=> selfDefense ENG
    // selfDefense: {
    //     trainer: {
    //         type: String,
    //         required: true
    //     },
    //     created_at: {
    //         type: Date,
    //         default: () => new Date(),
    //         immutable: true,
    //     },

    //     begin: {
    //         type: Date,
    //         default: () => new Date(),
    //         immutable: true,
    //     },

    //     hourTime: {
    //         type: Date,
    //         default: () => new Date(),
    //         immutable: true,
    //     },
    //     complete: {
    //         type: Boolean,
    //     },
    // },
})

export default mongoose.model("Course", CourseSchema);