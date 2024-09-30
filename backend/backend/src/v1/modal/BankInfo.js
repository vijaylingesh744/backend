const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bankInformationSchema = new Schema(
  {
    account_number: {
      type: String,
      default: null,
    },
    institution_number: {
      type: String,
      default: null,
    },
    transit_number: {
      type: String,
      default: null,
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
  },
  {
    timestamps: { createdAt: "created_date", updatedAt: "updated_date" },
  },
  { collection: "bank_information" } // Optionally set the collection name
);

module.exports = mongoose.model("BankInformation", bankInformationSchema);
