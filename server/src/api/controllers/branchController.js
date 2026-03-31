const Branch = require('../models/Branch');
const User = require('../models/User');

exports.createBranch = async (req, res) => {
    try {
        const branch = new Branch(req.body);
        await branch.save();
        res.status(201).json(branch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBranches = async (req, res) => {
    try {
        const branches = await Branch.find().populate('manager');
        res.json(branches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBranchById = async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id).populate('manager');
        if (!branch) return res.status(404).json({ message: "Branch not found" });
        res.json(branch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBranch = async (req, res) => {
    try {
        const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(branch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBranch = async (req, res) => {
    try {
        await Branch.findByIdAndDelete(req.params.id);
        res.json({ message: "Branch deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.assignStaff = async (req, res) => {
    try {
        const { userId, branchId } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.branch = branchId;
        await user.save();
        res.json({ message: "Staff assigned to branch", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
