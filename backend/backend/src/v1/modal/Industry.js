const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Industry = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    status:{
        type: Number,
        default: 0,
    }
},
{
    timestamps: true,
});
module.exports =  mongoose.model('Industry', Industry);
