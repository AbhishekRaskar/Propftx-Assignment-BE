const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.secret);
            if (decoded) {
                console.log("decoded",decoded);
                next();
            } else {
                res.status(401).json({ msg: "Not Authorized" });
            }
        } catch (error) {
            res.status(401).json({ msg: "Token verification failed", error: error.message });
        }
    } else {
        res.status(401).json({ msg: "Please Login.....!" });
    }
};

module.exports = {
    auth
};
