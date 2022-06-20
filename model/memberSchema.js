import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const MemberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
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

    address: {
        street: {
            type: String,
            required: true
        },

        number: {
            type: Number,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        zip: {
            type: Number,
            required: true,
        }
    }

});

// Pre middleware - die benutzt man für password. Wie speichern geheschte password in Datebank.
MemberSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
})


export default mongoose.model("Member", MemberSchema);