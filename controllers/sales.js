/**
 * Sales Controller
 * ----------------
 * Handles all operations related to cash sales.
 * 
 * Responsibilities:
 * - Retrieve all sales
 * - Retrieve a single sale
 * - Create a new sale
 * - Update a sale
 * - Delete a sale
 * 
 * This controller also interacts with the Procurement (stock) model
 * to ensure that enough stock exists before a sale is recorded.
 */

const Sale = require("../modules/sales");
const Procurement = require("../modules/procurement");


/**
 * GET ALL SALES
 * -------------
 * Retrieves all sales records from the database.
 * Results are sorted with the newest sales first.
 * 
 * Route: GET /api/sales
 */
const getAllSales = async (req, res) => {
  try {

    // Fetch all sales sorted by creation date
    const data = await Sale.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};



/**
 * GET SALE BY ID
 * --------------
 * Retrieves a specific sale record using its MongoDB ID.
 * 
 * Route: GET /api/sales/:id
 */
const getSaleById = async (req, res) => {
  try {

    const data = await Sale.findById(req.params.id);

    // Check if sale exists
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Sale not found"
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
 * CREATE SALE
 * -----------
 * Creates a new sale transaction and updates stock.
 * 
 * Process:
 * 1. Receive sale details from request body
 * 2. Find the corresponding stock record
 * 3. Check if sufficient stock exists
 * 4. Deduct sold tonnage from stock
 * 5. Record the sale in the database
 * 
 * Route: POST /api/sales
 */
const createSale = async (req, res) => {
  try {

    const {
      produceName,
      branch,
      tonnage,
      sellingPrice,
      amountPaid,
      buyerName,
      salesAgentName,
      date,
      time
    } = req.body;


    /**
     * STEP 1:
     * Find the stock record for this produce and branch
     */
    const stock = await Procurement.findOne({
      nameOfProduce: produceName,
      branch
    });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Product not found in stock for this branch"
      });
    }


    /**
     * STEP 2:
     * Ensure enough stock exists
     */
    if (stock.tonnage < tonnage) {
      return res.status(400).json({
        success: false,
        message: `Not enough stock available. Current stock: ${stock.tonnage} kg`
      });
    }


    /**
     * STEP 3:
     * Deduct sold quantity from stock
     */
    stock.tonnage -= tonnage;
    await stock.save();


    /**
     * STEP 4:
     * Create sale record
     */
    const sale = await Sale.create({
      produceName,
      branch,
      tonnage,
      sellingPrice,
      amountPaid,
      buyerName,
      salesAgentName,
      date,
      time
    });


    res.status(201).json({
      success: true,
      data: sale
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message
    });

  }
};



/**
 * UPDATE SALE
 * -----------
 * Updates an existing sale record.
 * 
 * Options used:
 * - new: true → return updated document
 * - runValidators: true → enforce schema validation
 * 
 * Route: PUT /api/sales/:id
 */
const updateSale = async (req, res) => {
  try {

    const updated = await Sale.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Sale not found"
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
 * DELETE SALE
 * -----------
 * Removes a sale record from the database.
 * 
 * Route: DELETE /api/sales/:id
 */
const deleteSale = async (req, res) => {
  try {

    const deleted = await Sale.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Sale not found"
      });
    }

    res.json({
      success: true,
      message: "Sale deleted successfully"
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
 * Makes controller functions available to routes.
 */
module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
};