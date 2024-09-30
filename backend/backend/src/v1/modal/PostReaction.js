const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PostReactionSchema = new mongoose.Schema({
    post_id:{
        type: ObjectId,
        default: null,
    },
    reaction_type:{
        type: Number,
        default: 0,
    },
    reacted_by:{
        type: ObjectId,
        default: null,
    },
},
{
    timestamps: true,
});
module.exports =  mongoose.model('PostReaction', PostReactionSchema);
