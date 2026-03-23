/**
 * Procurement Routes
 * ------------------
 * Defines API endpoints for managing procurement (stock purchases).
 * 
 * Features:
 * - Retrieve procurement records
 * - Create procurement records
 * - Update procurement records
 * - Delete procurement records
 * 
 * Middleware used:
 * - auth → verifies JWT authentication
 * - managerOnly → restricts actions to manager role
 * - validate → validates request body using schema
 */

const express = require("express");
const router = express.Router();

const Procurement = require("../modules/procurement");

// Authentication middleware
const auth = require("../middleware/auth");

// Validation middleware
const validate = require("../middleware/validate");

// Validation schema for creating procurement
// const { createProcurementSchema } = require("../validation/procurement");

// Role-based access middleware
const { managerOnly } = require("../middleware/roles");

// Controller functions
const {
  getProcurementById,
  getAllProcurement,
  createProcurement,
  updateProcurement,
  deleteProcurement,
} = require("../controllers/procurement.js");


/* ==========================================
   GET PROCUREMENT BY ID
   ------------------------------------------
   Route: GET /procurement/:id
   Access: Managers only
   Middleware:
   - auth
   - managerOnly
========================================== */
router.get("/:id", auth, managerOnly, getProcurementById);



/* ==========================================
   CREATE PROCUREMENT
   ------------------------------------------
   Route: POST /procurement
   Access: Managers only
   Middleware:
   - auth
   - managerOnly
   - validate(createProcurementSchema)
========================================== */
router.post("/", auth, managerOnly,createProcurement);



/* ==========================================
   GET ALL PROCUREMENT
   ------------------------------------------
   Route: GET /procurement
   Access: Authenticated users
   Middleware:
   - auth
========================================== */
router.get("/", auth, getAllProcurement);



/* ==========================================
   UPDATE PROCUREMENT
   ------------------------------------------
   Route: PUT /procurement/:id
   Access: Managers only
   Middleware:
   - auth
   - managerOnly
========================================== */
router.put("/:id", auth, managerOnly, updateProcurement);



/* ==========================================
   DELETE PROCUREMENT
   ------------------------------------------
   Route: DELETE /procurement/:id
   Access: Managers only
   Middleware:
   - auth
   - managerOnly
========================================== */
router.delete("/:id", auth, managerOnly, deleteProcurement);



/**
 * Export router
 */
module.exports = router;
