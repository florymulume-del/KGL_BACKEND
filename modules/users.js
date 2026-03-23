const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: 
    { type: String, 
        unique: true
     },
    username: String,
    password: String,
    role: {
        type: String,
        enum: ["Manager", "Sales Agent","director"],
        default: "Sales Agent"
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
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