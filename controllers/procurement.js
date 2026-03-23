/**
 * Procurement Controller
 * ----------------------
 * Handles all operations related to procurement (stock purchases).
 * 
 * Main responsibilities:
 * - Creating procurement records
 * - Retrieving procurement records
 * - Updating procurement records
 * - Deleting procurement records
 */

const Procurement = require("../modules/procurement.js");


/**
 * GET ALL PROCUREMENT RECORDS
 * ---------------------------
 * Fetches all procurement entries from the database.
 * Results are sorted by newest first.
 * 
 * Route: GET /api/procurement
 */
const getAllProcurement = async (req, res) => {
  try {

    // Retrieve all procurement records sorted by latest created
    const data = await Procurement.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};



/**
 * GET PROCUREMENT BY ID
 * ---------------------
 * Retrieves a single procurement record using its MongoDB ID.
 * 
 * Route: GET /api/procurement/:id
 */
const getProcurementById = async (req, res) => {
  try {

    const procurement = await Procurement.findById(req.params.id);

    // Return procurement record
    res.json(procurement);

  } catch (error) {

    res.status(500).json({
      message: "Procurement not found"
    });

  }
};



/**
 * CREATE PROCUREMENT
 * ------------------
 * Creates a new procurement entry in the database.
 * The request body must contain procurement details such as:
 * - produce name
 * - supplier
 * - tonnage
 * - buying price
 * - branch
 * 
 * Route: POST /api/procurement
 */
const createProcurement = async (req, res) => {
  try {

    // Insert new procurement record
    const data = await Procurement.create(req.body);

    res.status(201).json({
      success: true,
      data
    });

  } catch (err) {

    // Validation or input error
    res.status(400).json({
      success: false,
      message: err.message
    });

  }
};



/**
 * UPDATE PROCUREMENT
 * ------------------
 * Updates an existing procurement record.
 * 
 * Options used:
 * - returnDocument: "after" → return updated document
 * - runValidators: true → enforce schema validation
 * 
 * Route: PUT /api/procurement/:id
 */
const updateProcurement = async (req, res) => {
  try {

    const updated = await Procurement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message
    });

  }
};



/**
 * DELETE PROCUREMENT
 * ------------------
 * Removes a procurement record from the database.
 * 
 * Route: DELETE /api/procurement/:id
 */
const deleteProcurement = async (req, res) => {
  try {

    await Procurement.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Procurement deleted"
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message
    });

  }
};



/**
 * EXPORT CONTROLLER FUNCTIONS
 * ---------------------------
 * Makes these functions available to the routes.
 */
module.exports = {
  getAllProcurement,
  getProcurementById,
  createProcurement,
  updateProcurement,
  deleteProcurement
};