const Sale = require("../modules/sales");

 const getAllSales = async (req, res) => {
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
}
const getSaleById = async (req, res) => {
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
}
const createSale = async (req, res) => {
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
}
const updateSale = async (req, res) => {
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
}
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
}
module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
}