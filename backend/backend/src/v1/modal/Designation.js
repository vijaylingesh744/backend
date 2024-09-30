const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DesignationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',  // Optional: if you have a User model and want to establish a relationship
    },
    data: {
        type: [
            {
                designation: { type: String, required: true },
                company: { type: String, required: true },
                from_date: { type: String, required: true },
                to_date: { type: String, required: true }
            }
        ],
        required:true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Designation', DesignationSchema);