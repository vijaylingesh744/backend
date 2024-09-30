const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Skills = new mongoose.Schema({
    Industry_id:{
        type:ObjectId,  
        require: true,
    },
    skill:{
        type:String,
        default: null,
    },
    status:{
        type:Number,
        default: null,
    }
},
{
    timestamps: true,
});
module.exports =  mongoose.model('Skills', Skills);
