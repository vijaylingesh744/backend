
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const {CompanyDB} = require("../../../db/mongoConnection")
const CompanySchema = new mongoose.Schema({
    Company: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    Pincode: {
        type: String
    },
    Mobile: {
        type: String
    },
    Address: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Sub_Category: {
        type: String
    },
    NewCategory: {
        type: String
    },
    State: {
        type: String
    },
    Company_Category_Subcategory: {
        type: String
    }
}, 
{
    timestamps: true,
    // collection: 'scrapapp_companydata'  
    collection: 'CompanyData'  
});

module.exports = CompanyDB.model('CompanyData', CompanySchema);
// module.exports = CompanyDB.model('scrapapp_companydata', CompanySchema);