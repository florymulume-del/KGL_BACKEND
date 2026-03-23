/**
 * Credit Sales Controller
 * -----------------------
 * Handles all operations related to credit sales including:
 * - Creating credit sales
 * - Retrieving sales records
 * - Updating sales
 * - Deleting sales
 * 
 * Also integrates with the Procurement (stock) model to ensure
 * that stock is available before a credit sale is recorded.
 */

const CreditSale = require("../modules/creditsales");
const Procurement = require("../modules/procurement"); // Stock model



/**
 * GET ALL CREDIT SALES
 * --------------------
 * Fetches all credit sales records from the database.
 * Results are sorted by newest first using createdAt.
 * 
 * Route: GET /api/credit-sales
 */
const getAllCreditSale = async (req, res) => {
  try {

    // Retrieve all credit sales sorted by creation date (latest first)
    const data = await CreditSale.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });

  } catch (err) {

    // Server error handling
    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};



/**
 * CREATE CREDIT SALE
 * ------------------
 * Creates a new credit sale but first verifies that enough stock
 * exists in the Procurement collection.
 * 
 * Process:
 * 1. Find stock for the selected produce and branch
 * 2. Verify that available stock is enough
 * 3. Deduct sold tonnage from stock
 * 4. Record the credit sale
 * 
 * Route: POST /api/credit-sales
 */
const createCreditSale = async (req, res) => {
  try {

    // Extract request body values
    const {
      produceName,
      branch,
      tonnage,
      sellingPrice,
      buyerName,
      salesAgentName,
      date,
      time
    } = req.body;


    /**
     * STEP 1:
     * Find the stock record for the selected produce in the specific branch
     */
    const stock = await Procurement.findOne({
      nameOfProduce: produceName,
      branch
    });

    // If stock record does not exist
    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Product not found in stock for this branch"
      });
    }


    /**
     * STEP 2:
     * Check if enough stock is available
     */
    if (stock.tonnage < tonnage) {
      return res.status(400).json({
        success: false,
        message: `Not enough stock available. Current stock: ${stock.tonnage} kg`
      });
    }


    /**
     * STEP 3:
     * Reduce stock by the sold tonnage
     */
    stock.tonnage -= tonnage;

    // Save updated stock
    await stock.save();


    /**
     * STEP 4:
     * Record the credit sale in the database
     */
    const data = await CreditSale.create({
      produceName,
      branch,
      tonnage,
      sellingPrice,
      buyerName,
      salesAgentName,
      date,
      time
    });


    // Return success response
    res.status(201).json({
      success: true,
      data
    });

  } catch (err) {

    // Validation or request error
    res.status(400).json({
      success: false,
      message: err.message
    });

  }
};



/**
 * GET CREDIT SALE BY ID
 * ---------------------
 * Retrieves a specific credit sale using its MongoDB ID.
 * 
 * Route: GET /api/credit-sales/:id
 */
const getCreditSaleById = async (req, res) => {
  try {

    const data = await CreditSale.findById(req.params.id);

    // If record not found
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Credit sale not found"
      });
    }

    res.json({
      success: true,
      data
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message
    });

  }
};



/**
 * UPDATE CREDIT SALE
 * ------------------
 * Updates an existing credit sale record.
 * 
 * Options used:
 * - returnDocument: "after" → return the updated document
 * - runValidators: true → enforce schema validation
 * 
 * Route: PUT /api/credit-sales/:id
 */
const updateCreditSale = async (req, res) => {
  try {

    const updated = await CreditSale.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    // If record not found
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Credit sale not found"
      });
    }

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
 * DELETE CREDIT SALE
 * ------------------
 * Removes a credit sale record from the database.
 * 
 * Route: DELETE /api/credit-sales/:id
 */
const deleteCreditSale = async (req, res) => {
  try {

    const deleted = await CreditSale.findByIdAndDelete(req.params.id);

    // If record does not exist
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Credit sale not found"
      });
    }

    res.json({
      success: true,
      message: "Credit sale deleted successfully"
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
 * Makes the controller functions available to the routes.
 */
module.exports = {
  getAllCreditSale,
  createCreditSale,
  getCreditSaleById,
  updateCreditSale,
  deleteCreditSale
};