const CreditSale = require("../modules/creditsales.js");
const getAllCreditSale = async (req, res) => {
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
}
const createCreditSale = async (req, res) => {
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
}
const getCreditSaleById = async (req, res) => {
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
}
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
}
const deleteCreditSale = async (req, res) => {
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
}
module.exports = {
getAllCreditSale,
createCreditSale,
getCreditSaleById,
updateCreditSale,
deleteCreditSale
}