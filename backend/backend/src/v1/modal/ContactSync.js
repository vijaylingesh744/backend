// ContactSync

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ContactSyncSchema = new mongoose.Schema({
    ref_id:{
        type: ObjectId,
        required: true,
    },
    phone:{
        type:Array,
        default: [],
        unique: true,
    },
    status:{
        type: Number,
        default: 0,
    }
},
{
 timestamps: true,
}
);

module.exports =  mongoose.model('ContactSync', ContactSyncSchema);
