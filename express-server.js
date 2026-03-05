require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const procurementRoutes = require("./routers/procurement");
const salesRoutes = require("./routers/sales"); 
const usersRoutes = require("./routers/users");
const creditSalesRouter = require("./routers/creditsales");
const app = express();

// app.use(cors());

app.use(cors({
  origin: 'https://your-backend.onrender.com',
  credentials: true
}));
app.use(express.json());
app.use(express.json()) 


mongoose.connect(process.env.MONGODB_URI )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use(express.static("public"))
// Routes
app.use("/procurement", procurementRoutes);
app.use("/sales", salesRoutes); 
app.use("/users",usersRoutes);
app.use("/creditsales", creditSalesRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 
 