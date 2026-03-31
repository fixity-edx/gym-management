const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies?.token;

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.userRole === 'admin') {
        next();
    } else {
        res.status(403).send({ message: "Require Admin Role!" });
    }
};

const isStaff = (req, res, next) => {
    if (req.userRole === 'staff' || req.userRole === 'admin') {
        next();
    } else {
        res.status(403).send({ message: "Require Staff or Admin Role!" });
    }
};

const isMember = (req, res, next) => {
    if (req.userRole === 'member' || req.userRole === 'staff' || req.userRole === 'admin') {
        next();
    } else {
        res.status(403).send({ message: "Require Member Role!" });
    }
};

module.exports = {
    verifyToken,
    isAdmin,
    isStaff,
    isMember
};
