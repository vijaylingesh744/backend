const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Review = new mongoose.Schema(
{
    bp_id:{
        type: ObjectId,
        default: null,
    },
    user_id: {
        type: ObjectId,
        default: null,
    },
    rating: {
        type: String,
        default: null,
    },
    review: {
        type: String,
        default: null,
    },
},
{
    timestamps: true,
});

module.exports =  mongoose.model('Review', Review);
