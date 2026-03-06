require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./modules/users");

const procurementRoutes = require("./routers/procurement");
const salesRoutes = require("./routers/sales"); 
const usersRoutes = require("./routers/users");
const creditSalesRouter = require("./routers/creditsales");

const app = express();

// app.use(cors());

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(express.json()) 

async function createDefaultAdmin() {
  try {

    const adminEmail = "admin@gmail.com";

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {

      const hashedPassword = await bcrypt.hash("admin123", 10);

      const admin = new User({
        fullName: "System Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        status: "active"
      });

      await admin.save();

      console.log("✅ Default admin created");
      console.log("Email: admin@gmail.com");
      console.log("Password: admin123");

    } else {
      console.log("Admin already exists");
    }

  } catch (error) {
    console.error("Admin creation error:", error);
  }
}
mongoose.connect(process.env.MONGODB_URI )
  .then(async () => {
    console.log("MongoDB Connected");

    await createDefaultAdmin(); // 👈 creates admin automatically
  })

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
 
 