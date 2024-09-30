const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PageAdmin = new mongoose.Schema({
    users:{
        type: [{
            user:{
                type:ObjectId,
                ref: 'User',
            },
            role:{
                type:Number,
                default:0
            }
        }],
    },
    page_id:{
        type: ObjectId,
        default:null,
        ref:'Page'
    },
    status:{
        type: Number,
        default:0
    },
},
{
    timestamps:true
});

module.exports = mongoose.model('PageAdmin', PageAdmin)