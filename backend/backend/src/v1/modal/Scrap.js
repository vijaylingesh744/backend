
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const scrapSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    buyerFrom: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    country: {
        type: String
    },
    buyer_seller: {
        type: String
    },
    isVerified: {
        type: String
    }
}, 
{
    timestamps: true,
    collection: 'scrapapp_scrap'  // Specify the collection name here without 's'
});

module.exports = mongoose.model('scrapapp_scrap', scrapSchema);