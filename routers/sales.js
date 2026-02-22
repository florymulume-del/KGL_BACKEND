const express = require("express");
const router = express.Router();
const Sale = require("../modules/sales");

const auth = require("../middleware/auth");
const { salesOnly } = require("../middleware/roles");


// ==========================================
// CREATE SALE (Sales Agents Only)
// ==========================================
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


// ==========================================
// GET ALL SALES
// ==========================================
router.get("/", auth, async (req, res) => {
  try {
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
});


// ==========================================
// GET SINGLE SALE (For Edit)
// ==========================================
router.get("/:id", auth, async (req, res) => {
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


// ==========================================
// UPDATE SALE (Sales Agents Only)
// ==========================================
router.put("/:id", auth, salesOnly, async (req, res) => {
  try {
    const updated = await Sale.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,           // return updated document
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


// ==========================================
// DELETE SALE (Sales Agents Only)
// ==========================================
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