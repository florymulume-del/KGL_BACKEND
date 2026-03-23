/**
 * Sales Validation Schema
 * -----------------------
 * Uses Joi to validate incoming requests for creating a Sale.
 * 
 * Ensures that:
 * - Required fields are present
 * - Data types are correct
 * - Values meet minimum constraints
 */

const Joi = require("joi");

/**
 * Schema: createSaleSchema
 * ------------------------
 * Validates request body when creating a new sale.
 */
const createSaleSchema = Joi.object({
  // Name of the produce being sold
  produceName: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Produce name is required",
      "any.required": "Produce name is required"
    }),

  // Branch where sale occurs (uncomment and modify if you want to restrict branches)
   branch: Joi.string().valid("Maganjo", "Matugga").required(),

  // Amount of produce in kilograms
  tonnage: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.base": "Tonnage must be a number",
      "number.min": "Tonnage must be at least 1 kg",
      "any.required": "Tonnage is required"
    }),

   //Selling price per unit (optional, can add min limit)
  sellingPrice: Joi.number().min(1000).required(),

  // Amount paid by the buyer
  amountPaid: Joi.number()
    .min(10000)
    .required()
    .messages({
      "number.base": "Amount paid must be a number",
      "number.min": "Amount paid must be at least 10000",
      "any.required": "Amount paid is required"
    }),

  // Buyer name: only alphanumeric, at least 2 characters
  buyerName: Joi.string()
    .alphanum()
    .min(2)
    .required()
    .messages({
      "string.alphanum": "Buyer name must only contain letters and numbers",
      "string.min": "Buyer name must be at least 2 characters",
      "any.required": "Buyer name is required"
    }),

  // Sales agent name: only alphanumeric, at least 2 characters
  salesAgentName: Joi.string()
    .alphanum()
    .min(2)
    .required()
    .messages({
      "string.alphanum": "Sales agent name must only contain letters and numbers",
      "string.min": "Sales agent name must be at least 2 characters",
      "any.required": "Sales agent name is required"
    }),

  // Sale date in ISO 8601 format (YYYY-MM-DD)
  date: Joi.string()
    .isoDate()
    .required()
    .messages({
      "string.isoDate": "Date must be in ISO format (YYYY-MM-DD)",
      "any.required": "Date is required"
    }),

  // Time of the sale
  time: Joi.string()
    .required()
    .messages({
      "string.empty": "Time is required",
      "any.required": "Time is required"
    }),
});

module.exports = { createSaleSchema };