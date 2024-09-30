const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PageFollowers = new mongoose.Schema({
    page_id:{
        type: ObjectId,
        default:null
    },
    user_data: {
        type: {
            user_id: ObjectId,
            userdata: Object
        },
        default: null
    },
    status:{
        type:Number,
        default:0
    },
    is_admin:{
        type:Number,
        default:0
    },
    admin_type:{
        type:Number,
        default:0
    },
    nodeId:{
        type:String,
        default:0
    },
},
{
    timestamps:true
});

module.exports = mongoose.model('PageFollowers', PageFollowers )