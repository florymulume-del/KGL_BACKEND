/**
 * Credit Sales Routes
 * -------------------
 * Defines API endpoints for managing credit sales transactions.
 * 
 * Credit sales are transactions where goods are sold but payment
 * is not fully received immediately.
 * 
 * Features:
 * - Create credit sales
 * - Retrieve all credit sales
 * - Retrieve a single credit sale
 * - Update credit sale records
 * - Delete credit sale records
 * 
 * Middleware used:
 * - auth → verifies JWT authentication
 * - salesOnly → restricts actions to users with sales role
 * - validate → validates request body using schema
 */

const express = require("express");
const router = express.Router();

const CreditSale = require("../modules/creditsales");

// Authentication middleware
const auth = require("../middleware/auth");

// Role-based middleware (Sales agents only)
const { salesOnly } = require("../middleware/roles");

// Request validation middleware
const validate = require("../middleware/validate");
// Validation schema for creating sales
// const { createCreditSaleSchema  } = require("../validation/creditsales");




// Controller functions
const {
  getAllCreditSale,
  createCreditSale,
  getCreditSaleById,
  updateCreditSale,
  deleteCreditSale
} = require("../controllers/creditsales.js");


/* ==========================================
   CREATE CREDIT SALE
   ------------------------------------------
   Route: POST /creditsales
   Access: Sales agents only
   Middleware:
   - auth
   - salesOnly
   - validate(createCreditSaleSchema)
========================================== */
router.post("/", auth, salesOnly, createCreditSale);



/* ==========================================
   GET ALL CREDIT SALES
   ------------------------------------------
   Route: GET /creditsales
   Access: Authenticated users
   Middleware:
   - auth
========================================== */
router.get("/", auth, getAllCreditSale);



/* ==========================================
   GET SINGLE CREDIT SALE
   ------------------------------------------
   Route: GET /creditsales/:id
   Access: Authenticated users
   Middleware:
   - auth
========================================== */
router.get("/:id", auth, getCreditSaleById);



/* ==========================================
   UPDATE CREDIT SALE
   ------------------------------------------
   Route: PUT /creditsales/:id
   Access: Sales agents only
   Middleware:
   - auth
   - salesOnly
========================================== */
router.put("/:id", auth, salesOnly, updateCreditSale);



/* ==========================================
   DELETE CREDIT SALE
   ------------------------------------------
   Route: DELETE /creditsales/:id
   Access: Sales agents only
   Middleware:
   - auth
   - salesOnly
========================================== */
router.delete("/:id", auth, salesOnly, deleteCreditSale);



/**
 * Export router
 */
module.exports = router;