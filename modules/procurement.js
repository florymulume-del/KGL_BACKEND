const mongoose = require("mongoose");

const procurementSchema = new mongoose.Schema(
  {
    nameOfProduce: 
    {
       type: String,
        required: true
    },
    typeOfProduce:
     { 
      type: String,
       required: true
       },
    date: 
    { type: Date, 
      required: true
     },
    time:
     { type: String,
       required: true 
      },
    tonnage: 
    { 
      type: Number, 
      required: true,
       min: 10000
      },
    cost: {
       type: Number,
        required: true, 
        min: 10000 
         },
    sellingPrice: { 
      type: Number, 
      required: true, 
      min: 10000 
    },
    dealerName: { 
      type: String,
       required: true
       },
    branch: { 
      type: String,
       enum: ["Maganjo", "Matugga"],
        required: true 
      },
    contact: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Procurement", procurementSchema);