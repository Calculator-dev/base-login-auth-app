const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
            res.status(400).json({ message: "Authentification failed" })
            throw new Error("Authentication failed!");
        }
        const decodedToken = jwt.verify(token, "paragon");
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        res.status(400).json({ message: "Authentification failed" })
        const error = new Error("Authentication failed!", 403);
        return next(error);
    }
};