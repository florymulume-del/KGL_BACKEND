/**
 * Credit Sales Validation Schema
 * ------------------------------
 * Uses Joi to validate incoming requests for creating a Credit Sale.
 * 
 * Credit sales are sales where the buyer has not paid the full amount upfront.
 * This schema ensures all required fields are present, with correct data types
 * and value constraints.
 */

const Joi = require("joi");

/**
 * Schema: createCreditSaleSchema
 * -------------------------------
 * Validates request body when creating a new credit sale.
 */
const createCreditSaleSchema = Joi.object({
  // Name of the produce being sold
  produceName: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Produce name is required",
      "any.required": "Produce name is required"
    }),

  // Branch where the sale occurs (restricted to known branches)
  branch: Joi.string()
    .valid("Maganjo", "Matugga")
    .required()
    .messages({
      "any.only": "Branch must be either Maganjo or Matugga",
      "any.required": "Branch is required"
    }),

  // Amount of produce in kilograms
  tonnage: Joi.number()
    .min(100)
    .required()
    .messages({
      "number.base": "Tonnage must be a number",
      "number.min": "Tonnage must be at least 1000kg",
      "any.required": "Tonnage is required"
    }),

  // Selling price per unit
  sellingPrice: Joi.number()
    .min(1000)
    .required()
    .messages({
      "number.base": "Selling price must be a number",
      "number.min": "Selling price must be at least 1000",
      "any.required": "Selling price is required"
    }),

  // Buyer name: alphanumeric, at least 2 characters
  buyerName: Joi.string()
    .alphanum()
    .min(2)
    .required()
    .messages({
      "string.alphanum": "Buyer name must contain only letters and numbers",
      "string.min": "Buyer name must be at least 2 characters",
      "any.required": "Buyer name is required"
    }),

  // Sales agent name: alphanumeric, at least 2 characters
  salesAgentName: Joi.string()
    .alphanum()
    .min(2)
    .required()
    .messages({
      "string.alphanum": "Sales agent name must contain only letters and numbers",
      "string.min": "Sales agent name must be at least 2 characters",
      "any.required": "Sales agent name is required"
    }),

  // Sale date in ISO 8601 format
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

module.exports = { createCreditSaleSchema };