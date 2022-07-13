import mongoose from "mongoose";
import Member from "./memberSchema.js";


/* *************************************************
*  Erstellung der Collection Namens "DevicesSchema"
*  hierbei wird unsere Modele bzw. unsere Datenstruktur 
*  für alle Devices festgelegt.
******************************************************/

const DevicesSchema = new mongoose.Schema({
    member: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Member"
    },
    device_name: {
        type: String,
        required: true,
    },

    memberQuantity: {
        type: Number,
        max: 1
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

    end: {
        type: Date,
        default: () => new Date('2022-06-22:12:00'),
        required: true,
    },

    strict: false
})

export default mongoose.model("Device", DevicesSchema);