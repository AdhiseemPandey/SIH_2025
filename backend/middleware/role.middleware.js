const isAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
        return next();
    }
    return res.status(403).json({ error: "Forbidden: Requires admin privileges." });
};

const isSuperadmin = (req, res, next) => {
    if (req.user && req.user.role === 'superadmin') {
        return next();
    }
    return res.status(403).json({ error: "Forbidden: Requires superadmin privileges." });
};

module.exports = { isAdmin, isSuperadmin };