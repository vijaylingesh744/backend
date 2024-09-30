const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bpclientSchema = new mongoose.Schema({
    user_id:{
        type: ObjectId,
        required: true,
    },
    bp_id:{
        type: ObjectId,
        required: true,
    },
    user_type:{
        type: String,
        required:true,
    },
    req_date_time:{
        type: String,
        required:false,
    },
    accept_date_time:{
        type: String,
        required:false,
    },
    status:{
        type: Number,
        default: 0,
    }
},
{
 timestamps: true,
});

module.exports =  mongoose.model('bpclient', bpclientSchema);
