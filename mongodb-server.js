/**
 * MongoDB Connection
 * ------------------
 * Connects to the local MongoDB instance for the Karibu Groceries application.
 * 
 * Uses Mongoose to manage connection and schemas.
 */

const mongoose = require("mongoose");

// MongoDB URI
// For production, store this in a .env file instead of hardcoding
const URI = process.env.MONGODB_URI || "mongodb+srv://admin:admin1234@karibudts.ymc4apk.mongodb.net/?appName=KaribuDts";

// Connect to MongoDB
mongoose.connect(URI, {
    useNewUrlParser: true,      // Parse MongoDB connection string properly
    useUnifiedTopology: true,   // Use MongoDB's new server discovery and monitoring engine
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Optional: export mongoose to use in models if needed
module.exports = mongoose;