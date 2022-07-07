import mongoose from "mongoose";
import Member from "./memberSchema.js";


const DevicesSchema = new mongoose.Schema({
    device_name: {
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
        required: true,
    },

    member: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Member"
    },
    end: {
        type: Date,
        default: () => new Date('2022-06-22:12:00'),
        required: true,
    },

    strict: false
})

export default mongoose.model("Device", DevicesSchema);