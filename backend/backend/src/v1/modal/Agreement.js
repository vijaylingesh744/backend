const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Agreement = new mongoose.Schema({
    buyer_seller:{
        type: String,
        default: null,
    },
    user_id:{
        type: ObjectId,
        default: null,
    },
    content:{
        type: Array,
        default: null,
    },
    bp_id:{
        type: ObjectId,
        default: null,
    },
    sector:{
        type: String,
        default: null,
    },
    date_time:{
        type: String,
        default: null,
    },
    commision:{
        type: String,
        default: null,
    },
    valid_to:{
        type: String,
        default: null,
    },
    project_id:{
        type: ObjectId,
        default: null,
    },
    valid_from:{
        type: String,
        default: null,
    },
    user_signature:{
        type: String,
        default: null,
    },
    Company_name:{
      type:String,
      default:null
    },
    Product_details: {
      type:String,
      default:null
    },
    Product_quantity:{
      type:String,
      default:null
    },
    Buying_price: {
      type:String,
      default:null
    },
    Date_of_delivery: {
      type:String,
      default:null
    },
    Buyer_Business_Partner_name: {
      type:String,
      default:null
    },
    Business_Partner_commission:{
      type:String,
      default:null
    },
    Date_of_transaction: {
      type:String,
      default:null
    },
    document_submitted: {
      type:String,
      default:null
    },
    Deal_Approved: {
      type:String,
      default:null
    },
    title:{
      type:String,
      default:null
    },
    desc:{
      type:String,
      default:null
    },
    status:{
      type: String,
      default: 0,
  },
    
},
{
    timestamps: true,
});
module.exports =  mongoose.model('agreement', Agreement);
