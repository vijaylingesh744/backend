const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;



const businessInformationSchema = new Schema(
  {
    area_of_interest: {
      type: Array,
      default: null,
    },
    company_name: {
      type: String,
      default: null,
    },
    company_address: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    country:{ 
      type: String,
      default: null,
    },
    website:{ 
      type: String,
      default: null,
    },
    phone:{ 
      type: String,
      default: null,
    },
    city:{ 
      type: String,
      default: null,
    },
    email:{ 
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
    annual_turnover: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    other_industry: {
      type: String,
      default: null,
    },
    industry_id: {
      type: Array,
      default: null,
    },
    background_image: {
      type: String,
      default: null,
    },
    register_type: {
      type: Number,
      default: 1,
    },
    user_id: {
      type: ObjectId,
    },
    status:{
      type: Number,
      default: 0,
    },
    remark: {
      type: String,
      default: null,
    },
    business_logo:{
      type:String,
      default: null
    },
  },
  {
    timestamps: { createdAt: "created_date", updatedAt: "updated_date" },
     collection: "business_information" 
  } // Optionally set the collection name
);

module.exports = mongoose.model("BusinessInformation", businessInformationSchema);
