/**
 * Sales Routes
 * ------------
 * Defines all API endpoints related to sales transactions.
 * 
 * Features:
 * - Create sales
 * - Retrieve all sales
 * - Retrieve a single sale
 * - Update sales
 * - Delete sales
 * 
 * Middleware used:
 * - auth → verifies JWT token authentication
 * - salesOnly → restricts actions to users with the "sales" role
 * - validate → validates incoming request body using schemas
 */

const express = require("express");
const router = express.Router();

const Sale = require("../modules/sales");

// Authentication middleware
const auth = require("../middleware/auth");

// Role-based middleware
const { salesOnly } = require("../middleware/roles");

// Request validation middleware
const validate = require("../middleware/validate");

// Validation schema for creating sales
const { createSaleSchema } = require("../validation/sales");

// Controller functions
const {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
} = require("../controllers/sales.js");


/* ==========================================
   CREATE SALE
   ------------------------------------------
   Route: POST /sales
   Access: Sales agents only
   Middleware:
   - auth → ensures user is logged in
   - salesOnly → ensures user has sales role
   - validate(createSaleSchema) → validates request body
========================================== */
router.post("/", auth, salesOnly, validate(createSaleSchema), createSale);



/* ==========================================
   GET ALL SALES
   ------------------------------------------
   Route: GET /sales
   Access: Public or authenticated users
   Description:
   Retrieves all sales records sorted by date.
========================================== */
router.get("/",auth, getAllSales);



/* ==========================================
   GET SINGLE SALE
   ------------------------------------------
   Route: GET /sales/:id
   Access: Authenticated users
   Description:
   Retrieves a specific sale by ID (often used when editing).
========================================== */
router.get("/:id", auth, getSaleById);



/* ==========================================
   UPDATE SALE
   ------------------------------------------
   Route: PUT /sales/:id
   Access: Sales agents only
   Middleware:
   - auth
   - salesOnly
========================================== */
router.put("/:id", auth, salesOnly, updateSale);



/* ==========================================
   DELETE SALE
   ------------------------------------------
   Route: DELETE /sales/:id
   Access: Sales agents only
   Middleware:
   - auth
   - salesOnly
========================================== */
router.delete("/:id", auth, salesOnly, deleteSale);



/**
 * Export router
 */
module.exports = router;