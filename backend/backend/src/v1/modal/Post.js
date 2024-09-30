const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
    posted_by:{
        type: ObjectId,
        required: true,
    },
    description:{
        type: String,
        required: false,
    },
    date_time:{
        type: String,
        required: true,
    },   
    media_type:{
        type: Number,
        default: null,
    },   
    media_url:{
        type: Array,
        default: null,
    }, 
    edited:{
        type: Number,
        default: 0,
    },  
    status:{
        type: Number,
        default: 0,
    },
    tags:{
        type: Array,
        default: null,
    }

},
{
 timestamps: true,
});
module.exports =  mongoose.model('post', postSchema);
