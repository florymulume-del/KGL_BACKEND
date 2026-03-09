exports.managerOnly = (req, res, next) => {
  if (req.user.role !== "Manager") {
    return res.status(403).json({
      message: "Managers only"
    });
  }
  next();
};
exports.salesOnly = (req, res, next) => {
  if (req.user.role !== "Sales Agent") {
    return res.status(403).json({
      message: "Sales Agents only"
    });
  }
  next();
};
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "director only"
    });
  }
  next();
};