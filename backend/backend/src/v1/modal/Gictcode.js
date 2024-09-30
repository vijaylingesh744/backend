const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Gictcode = new mongoose.Schema({
    user_id:{
        type: ObjectId,
        required: true,
    },
    code:{
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

module.exports =  mongoose.model('Gictcode', Gictcode);
