const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Subscription = new mongoose.Schema({
    title:{
        type: String,
        default: null,
    },
    price:{
        type: Number,
        default: 0,
    },
    description:{
        type: String,
        default: null,
    },
    img:{
        type: String,
        default: null,
    },
    validity_month:{
        type: Number,
        default: 1,
    },
    status:{
        type: Number,
        default: 0,
    },
    admin_id:{
        type: ObjectId,
        default: null,
    },
},
{
    timestamps: true,
});
module.exports =  mongoose.model('Subscription', Subscription);
