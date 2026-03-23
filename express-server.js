


// async function createDefaultAdmin() {
//   try {

//     const adminEmail = "admin@gmail.com";

//     const existingAdmin = await User.findOne({ email: adminEmail });

//     if (!existingAdmin) {

//       const hashedPassword = await bcrypt.hash("admin123", 10);

//       const admin = new User({
//         fullName: "System Admin",
//         email: adminEmail,
//         password: hashedPassword,
//         role: "Manager",
//         status: "active"
//       });

//       await admin.save();

//       console.log("✅ Default admin created");
//       console.log("Email: admin@gmail.com");
//       console.log("Password: admin123");

//     } else {
//       console.log("Admin already exists");
//     }

//   } catch (error) {
//     console.error("Admin creation error:", error);
//   }
// }
// mongoose.connect(process.env.MONGODB_URI )
//   .then(async () => {
//     console.log("MongoDB Connected");

//     await createDefaultAdmin(); // 👈 creates admin automatically
//   })


/**
 * Express Server Setup
 * --------------------
 * This is the main entry point for the KGL REST API backend.
 * 
 * Features:
 * - Connects to MongoDB using Mongoose
 * - Configures CORS and JSON body parsing
 * - Registers routers for Users, Sales, Credit Sales, Procurement
 * - Serves Swagger API documentation
 * - Starts the server on port 3000
 */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routers
const procurementRoutes = require("./routers/procurement");
const salesRoutes = require("./routers/sales"); 
const usersRoutes = require("./routers/users");
const creditSalesRouter = require("./routers/creditsales");

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();

/* ==========================
   MIDDLEWARE
========================== */
// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Serve static files if needed (e.g., images, public assets)
app.use(express.static("public"));


/* ==========================
   SWAGGER API DOCUMENTATION
========================== */
const swaggerDefinition = {
    openapi: '3.0.0', // OpenAPI version
    info: {
        title: 'KGL REST API Documentation',
        version: '1.0.5',
        description: 'This is the documentation for the KGL REST API for the frontend app',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};

// Swagger options specifying where to read route files
const options = {
    swaggerDefinition,
    apis: ['./routers/*.js'], // Path to route files for annotations
};

// Create Swagger specification
const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/* ==========================
   DATABASE CONNECTION
========================== */
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB error:", err));


/* ==========================
   ROUTES
========================== */
app.use("/procurement", procurementRoutes);
app.use("/sales", salesRoutes); 
app.use("/users", usersRoutes);
app.use("/creditsales", creditSalesRouter);


/* ==========================
   START SERVER
========================== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));