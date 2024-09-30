const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ConnectProjectSchema = new mongoose.Schema({
    project_id:{
        type: ObjectId,
        default: null,
    },
    bp_id:{
        type: ObjectId,
        default: null,
    },
    user_id:{
        type: ObjectId,
        default: null,
    },
    user_type:{
        type: String,
        default: null,
    },
    status:{
        type: Number,
        default: null,
    },
},
{
    timestamps: true,
});
module.exports =  mongoose.model('connection_project', ConnectProjectSchema);
