const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PostTagSchema = new mongoose.Schema({
    key:{
        type: String,
        required: true,
    },
    value:{
        type: String,
        default: null,
    }
},
{
    timestamps: true,
});

module.exports =  mongoose.model('PostTag', PostTagSchema);
