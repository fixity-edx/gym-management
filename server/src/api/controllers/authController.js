const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role, branchId } = req.body;

        // Validate role
        if (role === 'admin') {
            return res.status(400).json({ message: "Admin registration not allowed" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const user = new User({
            name,
            email,
            password,
            role: role || 'member',
            branch: branchId || null,
            digitalCardId: `GYM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if it's the Admin from .env
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ id: 'admin-id', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
            return res.json({
                id: 'admin-id',
                name: 'Super Admin',
                email: process.env.ADMIN_EMAIL,
                role: 'admin',
                token
            });
        }

        const user = await User.findOne({ email }).populate('branch');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
            branch: user.branch,
            digitalCardId: user.digitalCardId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        if (req.userId === 'admin-id') {
            return res.json({
                id: 'admin-id',
                name: 'Super Admin',
                email: process.env.ADMIN_EMAIL,
                role: 'admin'
            });
        }
        const user = await User.findById(req.userId).populate('branch');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
