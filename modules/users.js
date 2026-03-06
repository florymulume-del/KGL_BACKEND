const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: 
    { type: String, 
        unique: true
     },
    username: String,
    password: String,
    // role: {
    //     type: String,
    //     enum: ["Manager", "Sales Agent"],
    //     default: "Sales Agent"
    // },
    role: {
  type: String,
  enum: ["admin", "manager", "staff"],
  default: "staff"
},
    // status: {
    //     type: String,
    //     enum: ["Active", "Inactive"],
    //     default: "Active"
    // }
    status: {
  type: String,
  enum: ["active", "inactive"],
  default: "active"
},
    department: String,
    mustChangePassword:
     { 
        type: Boolean,
         default: true 
        },
},
 { timestamps: true });

module.exports = mongoose.model("User", userSchema);

