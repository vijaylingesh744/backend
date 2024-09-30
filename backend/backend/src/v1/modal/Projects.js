const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const { v4: uuidv4 } = require('uuid');

const Projects = new mongoose.Schema({
    user_id:{
        type: ObjectId,
        default: null,
    },
    project_id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    bp_id:{
        type: ObjectId,
        default: null,
    },
    user_type:{
        type: String,
        default: null,
    },
    title:{
        type: String,
        default: null,
    },
    desc:{
        type: String,
        default: null,
    },
    designation:{
        type: String,
        default: null,
    },
    commission_type:{
        type: String,
        default: null,
    },
    commission_value:{
        type: String,
        default: null,
    },
    StageId:{
        type: Number,
        default: 0,
    },
    status:{
        type: String,
        default: 0,
    } 
},
{
    timestamps: true,
});
module.exports =  mongoose.model('Projects', Projects);
