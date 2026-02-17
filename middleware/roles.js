exports.managerOnly = (req, res, next) => {
    if (req.user.role !== "Manager") {
        return res.status(403).json({
            error: "Managers only"
        });
    }
    next();
};

exports.salesOnly = (req, res, next) => {
    if (req.user.role !== "Sales Agent") {
        return res.status(403).json({
            error: "Sales Agents only"
        });
    }
    next();
};
