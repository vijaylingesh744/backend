const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema({

    post_id:{
        type: ObjectId,
        default: null,
    },
    user_id:{
        type: ObjectId,
        default: null,
    },
    msg:{
        type: String,
        default: null,
    },
    edited:{
        type: Number,
        default: 0,
    },
    date_time:{
        type: String,
        default: null,
    },
    commented_by:{
        type: ObjectId,
        default: null,
    },
},
{
    timestamps: true,
});
module.exports =  mongoose.model('Comments', CommentSchema);
