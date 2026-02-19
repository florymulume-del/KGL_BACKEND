const express = require("express");
const router = express.Router();
const Sale = require("../modules/sales");

const auth = require("../middleware/auth");
const { salesOnly } = require("../middleware/roles");


// ==============================
// CREATE SALE
// ==============================
// CREATE SALE (Sales Agents only)
router.post("/", auth, salesOnly, async (req, res) => {

  try {
    const data = await Sale.create(req.body);
    res.status(201).json({
      success: true,
      data
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

// ==============================
// READ SALES WITH PAGINATION
// ==============================
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Sale.countDocuments();

    const data = await Sale.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// ==============================
// GET SINGLE SALE (for edit)
// ==============================
router.get("/", auth, async (req, res) => {

  try {
    const data = await Sale.findById(req.params.id);

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
});

// ==============================
// UPDATE SALE
// ==============================
// UPDATE SALE
router.put("/:id", auth, salesOnly, async (req, res) => {

  try {
    const updated = await Sale.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
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
});

// ==============================
// DELETE SALE
// ==============================
// DELETE SALE
router.delete("/:id", auth, salesOnly, async (req, res) => {

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
});

module.exports = router;
