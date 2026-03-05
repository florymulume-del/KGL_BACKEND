const express = require("express");
const router = express.Router();
const CreditSale = require("../modules/creditsales");
const auth = require("../middleware/auth");
const { salesOnly } = require("../middleware/roles");
const {getAllCreditSale,createCreditSale,getCreditSaleById,updateCreditSale,deleteCreditSale} = require("../controllers/creditsales.js");

// ==============================
// CREATE CREDIT SALE
// ==============================
router.post("/", auth, salesOnly,createCreditSale);
// ==============================
// READ ALL CREDIT SALES
// ==============================
router.get("/", auth,getAllCreditSale);
// ==============================
// GET SINGLE CREDIT SALE
// ==============================
router.get("/:id", auth,getCreditSaleById );
// ==============================
// UPDATE CREDIT SALE
// ==============================
router.put("/:id", auth, salesOnly,updateCreditSale );
// ==============================
// DELETE CREDIT SALE
// ==============================
router.delete("/:id", auth, salesOnly,deleteCreditSale );

module.exports = router;
