const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Event = new mongoose.Schema({
    client_id:{
        type: ObjectId,
        default: null,
    },
    bp_id:{
        type: ObjectId,
        default: null,
    },
    title:{
        type: String,
        default: null,
    },
    description:{
        type: String,
        default: null,
    },
    date:{
        type: String,
        default: null,
    },
    time:{
        type: String,
        default: null,
    },
    project_id:{
        type: ObjectId,
        default: null,
    },
    status:{
        type: Number,
        default: 1,
    },
    timezone:{
        type: String,
        default: "",
    },
    client_name:{
        type: String,
        default: "",
    },
    created_by:{
        type: ObjectId,
        default: null
    },
 
},
{
    timestamps: true,
});
module.exports =  mongoose.model('event', Event);
