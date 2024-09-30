const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Businesscommunity = new mongoose.Schema({
    title:{
        type: String,
        default: null,
    },
    bussiness_id:{
        type: ObjectId,
        default: null,
    },
    status:{
        type: String,
        default: null,
    },
    connecting_list:{
        type: Array,
        default: null,
    }
},
{
    timestamps: true,
});
module.exports =  mongoose.model('Businesscommunity', Businesscommunity);