const express = require("express");
const router = express.Router();
const CreditSale = require("../modules/creditsales");

// GET all credit sales
/**
 * 
 */
router.get("/", async (req, res) => {
  try {
    const data = await CreditSale.find().sort({ createdAt: -1 });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET a single credit sale
router.get("/:id", async (req, res) => {
  try {
    const data = await CreditSale.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Credit sale not found" });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE a new credit sale
router.post("/", async (req, res) => {
  try {
    const newSale = new CreditSale(req.body);
    const saved = await newSale.save();
    res.status(201).json({ message: "Credit sale created", data: saved });
  } catch (err) {
    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE an existing credit sale
router.put("/:id", async (req, res) => {
  try {
    const updated = await CreditSale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: "Credit sale not found" });
    res.json({ message: "Credit sale updated", data: updated });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a credit sale
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await CreditSale.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Credit sale not found" });
    res.json({ message: "Credit sale deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
