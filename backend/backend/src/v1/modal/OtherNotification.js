const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const otherNotifySchema = new mongoose.Schema({
    user_id:{
        type: ObjectId,
        default: null,
    },
    bp_id:{
        type: ObjectId,
        default: null,
    },
    transaction_id:{
        type: ObjectId,
        default: null,
    },
    client_id:{
        type: ObjectId,
        default: null,
    },
    description:{
        type: String,
        default: null,
    },
    status:{
        type: String,
        default: 0,
    },
    type:{
        type: String,
        default: "BPSIDE",
    },
    date_time:{
        type: String,
        required: false,
    }
},
{
 timestamps: true,
});
module.exports =  mongoose.model('otherNotify', otherNotifySchema);
