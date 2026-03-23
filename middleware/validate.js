/**
 * Validation Middleware
 * ---------------------
 * Validates incoming request bodies against a Joi schema.
 * 
 * Usage:
 *   router.post("/", validate(schema), controllerFunction);
 * 
 * Behavior:
 * - Validates req.body
 * - Collects all validation errors (abortEarly: false)
 * - Returns 400 Bad Request with all error messages if validation fails
 * - Proceeds to next middleware if validation passes
 */

const validate = (schema) => (req, res, next) => {
  // Validate request body against schema
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    // Collect all error messages from Joi
    const messages = error.details.map((d) => d.message);

    return res.status(400).json({
      success: false,
      message: messages
    });
  }

  // Validation passed, proceed
  next();
};

module.exports = validate;