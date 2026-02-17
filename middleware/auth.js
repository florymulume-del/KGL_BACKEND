module.exports = (req, res, next) => {
    const role = req.headers["x-user-role"];

    if (!role) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = { role };
    next();
};
