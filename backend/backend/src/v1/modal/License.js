const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const LicenseSchema = new mongoose.Schema({
    user_id:{
        type: ObjectId,
        required: true,
    }, 
    PanCard:{
        type: String,
        default: null,
    },   
    AddressProof:{
        type: String,
        default: null,
    },   
    NationalID:{
        type: String,
        default: null,
    },   
    GstCertificate:{
        type: String,
        default: null,
    },   
    BusinessRegister:{
        type: String,
        default: null,
    },   
    BankPassbook:{
        type: String,
        default: null,
    },   
    ExportCopy:{
        type: String,
        default: null,
    },   
    status:{
        type: Number,
        default: 0,
    }
},
{
 timestamps: true,
});

// ExportCopy: ExportCopy,
module.exports =  mongoose.model('License', LicenseSchema);
