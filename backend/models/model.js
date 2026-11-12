import mongoose from "mongoose";


const leadSchema = new mongoose.Schema({
    leadgenId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;