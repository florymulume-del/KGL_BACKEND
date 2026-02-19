const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const procurementRoutes = require("./routers/procurement");
const salesRoutes = require("./routers/sales"); 
const usersRoutes = require("./routers/users");
const creditSalesRouter = require("./routers/creditsales");


const app = express();




app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/karibu_groceries_db")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB error:", err));

// Routes
app.use("/procurement", procurementRoutes);
app.use("/sales", salesRoutes); 
app.use("/users",usersRoutes);
app.use("/creditsales", creditSalesRouter);

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));

 