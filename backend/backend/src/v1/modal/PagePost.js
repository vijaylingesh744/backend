const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PagePost = new mongoose.Schema({
    posted_by:{
        type: ObjectId,
        required: true,
    },
    description:{
        type: String,
        default: null,
    },
    date_time:{
        type: String,
        required: true,
    },   
    media_type:{
        type: Number,
        default: null,
    }, 
    edited:{
        type: Number,
        default: 0,
    },  
    media_url:{
        type: Array,
        default: null,
    },   
    status:{
        type: Number,
        default: 0,
    },
    page_id:{
        type: ObjectId,
        default:null
    }

},
{
 timestamps: true,
});
module.exports =  mongoose.model('PagePost', PagePost);