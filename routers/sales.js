const express = require("express");
const router = express.Router();
const Sale = require("../modules/sales");
const auth = require("../middleware/auth");
const { salesOnly } = require("../middleware/roles");
const {getAllSales,getSaleById,createSale,updateSale,deleteSale} = require("../controllers/sales.js")
// ==========================================
// CREATE SALE (Sales Agents Only)
// ==========================================
router.post("/", auth, salesOnly,createSale );


// ==========================================
// GET ALL SALES
// ==========================================
router.get("/", getAllSales);


// ==========================================
// GET SINGLE SALE (For Edit)
// ==========================================
router.get("/:id", auth,getSaleById );


// ==========================================
// UPDATE SALE (Sales Agents Only)
// ==========================================
router.put("/:id", auth, salesOnly,updateSale);


// ==========================================
// DELETE SALE (Sales Agents Only)
// ==========================================
router.delete("/:id", auth, salesOnly,deleteSale );


module.exports = router;