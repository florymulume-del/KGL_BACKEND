const express = require("express");
const router = express.Router();
const CreditSale = require("../modules/creditsales");

const auth = require("../middleware/auth");
const { salesOnly } = require("../middleware/roles");

// ==============================
// CREATE CREDIT SALE
// ==============================


router.post("/", auth, salesOnly, async (req, res) => {
  try {
    const data = await CreditSale.create(req.body);
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
// READ ALL CREDIT SALES
// ==============================
router.get("/", auth, async (req, res) => {
  try {
    const data = await CreditSale.find()
      .sort({ createdAt: -1 });

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

// ==============================
// GET SINGLE CREDIT SALE
// ==============================
router.get("/:id", auth, async (req, res) => {
  try {
    const data = await CreditSale.findById(req.params.id);

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
});

// ==============================
// UPDATE CREDIT SALE
// ==============================
router.put("/:id", auth, salesOnly, async (req, res) => {
  try {
    const updated = await CreditSale.findByIdAndUpdate(
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
});

// ==============================
// DELETE CREDIT SALE
// ==============================


router.delete("/:id", auth, salesOnly, async (req, res) => {
  try {
    const deleted = await CreditSale.findByIdAndDelete(req.params.id);

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
});

module.exports = router;
