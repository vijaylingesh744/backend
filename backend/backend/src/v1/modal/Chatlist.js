const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ChatList = new mongoose.Schema({
    sender:{
        type: ObjectId,
        required: true,
    },
    receive:{
        type: ObjectId,
        default: null,
    },
    nodeId:{
        type: String,
        default: null,
    },
    last_msg:{
        type: String,
        default: null,
    }, 
    status:{
        type: Number,
        default: 0,
    },
    request_type:{
        type: Number,
        default: 0,
    },
    project_id:{
        type: ObjectId,
        default: null,
    },
},
{
    timestamps: true,
});

module.exports =  mongoose.model('ChatList', ChatList);
