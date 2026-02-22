const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const procurementRoutes = require("./routers/procurement");
const salesRoutes = require("./routers/sales"); 
const usersRoutes = require("./routers/users");
const creditSalesRouter = require("./routers/creditsales");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


const app = express();

app.use(cors());
app.use(express.json());

app.use(express.json())

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
        title: 'KGL REST API Documentation',
        version: '1.0.0',
        description: 'This is the documentation for the KGL REST API for the frontend app',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};
// Options for swagger-jsdoc
const options = {
    swaggerDefinition, // Use the swaggerDefinition object defined above
    apis: ['./routers/*.js'], // Specify the path to your API route files
   
};


// Create the Swagger specification
const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



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

 