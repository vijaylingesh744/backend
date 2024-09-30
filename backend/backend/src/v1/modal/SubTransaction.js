const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Subtransaction = new mongoose.Schema({
    user_id:{
        type: ObjectId,
        default: null,
    },
    Sub_id:{
        type: ObjectId,
        default: null,
    },
    transaction_id:{
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
    payment:{
        type: String,
        default: null,
    },
    status:{
        type: Number,
        default: 0,
    },
},
{
    timestamps: true,
});
module.exports =  mongoose.model('Subtransaction', Subtransaction);
