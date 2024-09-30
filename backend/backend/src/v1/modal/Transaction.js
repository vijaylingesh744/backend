const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TransactionSchema = new mongoose.Schema({
    projectId:{
        type: ObjectId,
        default: null,
    },
    bpId:{
        type: ObjectId,
        default: null,
    },
    senderId:{
        type: ObjectId,
        default: null,
    },
    receiverId:{
        type: ObjectId,
        default: null,
    },
    client_id:{
        type: ObjectId,
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
    mop:{
        type: String,
        default: null,
    },
    pInitiation:{
        type: String,
        default: null,
    },
    dateTime :{
        type: String,
        default: null,
    },
    remark :{
        type: String,
        default: null,
    },
    csFee :{
        type: String,
        default: null,
    },
    bpCharges :{
        type: String,
        default: null,
    },
    receiverCharges :{
        type: Array,
        default: null,
    },
    dueDate :{
        type: String,
        default: null,
    },
    invoiceNo :{
        type: String,
        default: null,
    },
    transactionNo :{
        type: String,
        default: null,
    },
    deathLine :{
        type: String,
        default: null,
    },
    amount :{
        type: String,
        default: null,
    },
    tax :{
        type: String,
        default: null,
    },
    currency :{
        type: String,
        default: null,
    },
},
{
    timestamps: true,
});
module.exports =  mongoose.model('Transaction', TransactionSchema);
