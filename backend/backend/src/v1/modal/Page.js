const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Page = new mongoose.Schema({
    user_id:{
        type:ObjectId,  
        require: true,
    },
    title:{
        type:String,
        default: null,
    },
    description:{
        type:String,
        default: null,
    },
    profile_icon:{
        type:String,
        default: null,
    },
    image:{
        type:String,
        default: null,
    },
    status:{
        type:Number,
        default: null,
    },
    website:{
        type:String,
        default: null,
    },
    phone:{
        type:String,
        default: null,
    },
    overview:{
        type:String,
        default: null,
    },
    industry:{
        type:ObjectId,
        default: null,
    },
    area_of_interest: {
        type: Array,
        default: null,
    },
    company_size:{
        type:String,
        default: null,
    },
    founded:{
        type:String,
        default: null,
    },
    speciality:{
        type:String,
        default: null,
    },
    location:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    }
},
{
    timestamps: true,
});
module.exports =  mongoose.model('Page', Page);
