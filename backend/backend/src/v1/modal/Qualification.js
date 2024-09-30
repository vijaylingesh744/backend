const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Qualification = new mongoose.Schema({
    user_id:{
        type:ObjectId,
        default: null,
    },
    university:{
        type:String,
        default: null,
    },
    academic_year:{
        type:String,
        default: null,
    },
    description:{
        type: String,
        default: null,
    },
    major:{
        type:String,
        default:null,
    },
    course:{
        type: String,
        default: null,
    },
    certificate:{
        type: [],
        default: [],
    } 
},
{
    timestamps: true,
});

module.exports =  mongoose.model('Qualification', Qualification);
