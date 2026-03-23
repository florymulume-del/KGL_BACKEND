/**
 * Role-Based Access Control Middleware
 * -------------------------------------
 * Restricts API access based on the user's role.
 * 
 * Usage:
 * - Attach to routes after `auth` middleware, which sets `req.user`.
 * - Example:
 *    router.post("/create", auth, managerOnly, createProcurement);
 * 
 * Roles in the system:
 * - Manager
 * - Sales Agent
 * - Director
 */

/**
 * Manager Only
 * -------------
 * Allows only users with role "manager".
 */
exports.managerOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "manager") {
    return res.status(403).json({
      message: "Managers only"
    });
  }
  next();
};

/**
 * Sales Agents Only
 * -----------------
 * Allows only users with role "Sales Agent".
 */
exports.salesOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "Sales Agent") {
    return res.status(403).json({
      message: "Sales Agents only"
    });
  }
  next();
};

/**
 * Director Only
 * -------------
 * Allows only users with role "Director".
 */
exports.directorOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "Director") {
    return res.status(403).json({
      message: "Directors only"
    });
  }
  next();
};