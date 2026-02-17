const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  produceName: {
    type: String,
    required: [true, "Produce name is required"],
    trim: true
  },

  tonnage: {
    type: Number,
    required: [true, "Tonnage is required"],
    min: [1, "Tonnage must be at least 1"]
  },

  amountPaid: {
    type: Number,
    required: [true, "Amount Paid is required"],
    min: [10000, "Amount must be at least 5 digits (10,000 UGX)"]
  },

  buyerName: {
    type: String,
    required: [true, "Buyer's name is required"],
    minlength: [2, "Buyer name must be at least 2 characters"],
    match: [/^[a-zA-Z0-9 ]+$/, "Buyer name must be alpha-numeric"],
    trim: true
  },

  salesAgentName: {
    type: String,
    required: [true, "Sales Agent name is required"],
    minlength: [2, "Sales Agent name must be at least 2 characters"],
    match: [/^[a-zA-Z0-9 ]+$/, "Sales Agent name must be alpha-numeric"],
    trim: true
  },

  date: {
    type: String,
    required: [true, "Date is required"]
  },

  time: {
    type: String,
    required: [true, "Time is required"]
  }

}, { timestamps: true });

module.exports = mongoose.model("Sale", salesSchema);

