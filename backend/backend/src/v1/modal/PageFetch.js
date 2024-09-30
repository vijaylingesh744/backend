const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PageFetch = new mongoose.Schema({
    user_id:{
        type: ObjectId,
        default:null
    },
    page_id:{
        type: [ObjectId],
        default: null
    },
    industry:{
        type: [],
        default:null
    },
    skills:{
        type: [],
        default:null
    },
    status:{
        type: Number,
        default:0
    },
},
{
    timestamps:true
});

module.exports = mongoose.model('PageFetch', PageFetch)