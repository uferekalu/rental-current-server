const mongoose = require("mongoose");

const RentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users"
    },
    accomodationStatus: {
      type: String,
      required: true
    },
    rentRequestAmount: {
      type: String,
      required: true
    },
    monthlySalary: {
      type: String,
      required: true
    },
    monthlyPaymentPlan: {
      type: String,
      required: true,
      default: "1 Month"
    },
    preapprovedAmount: {
      type: String
    },
    monthlyPayment: {
      type: [String]
    },
    tenor: {
      type: [String]
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users"
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Rent", RentSchema);
