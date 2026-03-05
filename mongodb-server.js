require("dotenv").config()
const mongoose = require("mongoose")

const URI = process.env.MONGODB_URI
 mongoose.connect(URI)
     .then(() => {
         console.log("connect to mongo db")
     }) 
     .catch((err) => {
        console.log(err)
     })

