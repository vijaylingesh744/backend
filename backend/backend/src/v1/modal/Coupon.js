const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const coupon = new mongoose.Schema({
    title:{
        type: String,
        default: null,
    },
    valid_from:{
        type: String,
        default: null,
    },
    valid_to:{
        type: String,
        default: null,
    },
    value:{
        type: String,
        default: null,
    },
    country:{
        type: String,
        default: null,
    },
 
},
{
    timestamps: true,
});
module.exports =  mongoose.model('Coupon', coupon);
