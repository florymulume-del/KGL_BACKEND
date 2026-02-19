const mongoose = require("mongoose")

const URI = "mongodb://localhost:27017/karibu_groceries_db"
 mongoose.connect(URI)
     .then(() => {
         console.log("connect to mongo db")
     })
     .catch((err) => {
        console.log(err)
     })

