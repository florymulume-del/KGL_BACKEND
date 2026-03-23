const mongoose = require("mongoose");
const creditSaleSchema = new mongoose.Schema({

  buyerName: {
    type: String,
    required: [true, "Buyer name is required"],
    minlength: [2, "Buyer name must be at least 2 characters"],
    match: [/^[a-zA-Z0-9 ]+$/, "Buyer name must be alphanumeric"],
    trim: true
  },

  nin: {
    type: String,
    required: [true, "National ID (NIN) is required"],
    uppercase: true,
    match: [/^CM[A-Z0-9]{12}$|^CF[A-Z0-9]{12}$/, 
      "Invalid Uganda NIN format (Example: CM123456789012 or CF123456789012)"]
  },

  location: {
    type: String,
    required: [true, "Location is required"],
    minlength: [2, "Location must be at least 2 characters"],
    match: [/^[a-zA-Z0-9 ]+$/, "Location must be alphanumeric"],
    trim: true
  },

  contact: {
    type: String,
    required: [true, "Contact is required"],
    match: [/^(\+256|0)7\d{8}$/, 
      "Invalid Ugandan phone number (Example: +256700123456 or 0700123456)"]
  },

  amountDue: {
    type: Number,
    required: [true, "Amount Due is required"],
    min: [10000, "Amount must be at least 5 digits (10,000 UGX)"]
  },

  salesAgentName: {
    type: String,
    required: [true, "Sales Agent name is required"],
    minlength: [2, "Sales Agent name must be at least 2 characters"],
    match: [/^[a-zA-Z0-9 ]+$/, "Sales Agent name must be alphanumeric"],
    trim: true
  },

  produceName: {
    type: String,
    required: [true, "Produce name is required"],
    trim: true
  },

  produceType: {
    type: String,
    required: [true, "Produce type is required"],
    enum: ["Organic", "Hybrid"], // restrict to valid types
    trim: true
  },

  tonnage: {
    type: Number,
    required: [true, "Tonnage is required"],
    min: [1, "Tonnage must be at least 1"]
  },

  dispatchDate: {
    type: Date,
    required: [true, "Dispatch date is required"]
  },

  dueDate: {
    type: Date,
    required: [true, "Due date is required"],
    validate: {
      validator: function(value) {
        return value > this.dispatchDate;
      },
      message: "Due date must be after dispatch date"
    }
  }

}, { timestamps: true });

module.exports = mongoose.model("CreditSale", creditSaleSchema);