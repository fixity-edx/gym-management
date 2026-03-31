const User = require('../models/User');
const Attendance = require('../models/Attendance');

exports.getAllMembers = async (req, res) => {
    try {
        const members = await User.find({ role: 'member' }).populate('branch');
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMemberById = async (req, res) => {
    try {
        const member = await User.findById(req.params.id).populate('branch');
        if (!member) return res.status(404).json({ message: "Member not found" });
        res.json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMemberStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const member = await User.findById(req.params.id);
        if (!member) return res.status(404).json({ message: "Member not found" });
        member.status = status;
        await member.save();
        res.json({ message: `Member status updated to ${status}`, member });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAttendanceHistory = async (req, res) => {
    try {
        const userId = req.params.userId || req.userId;
        const history = await Attendance.find({ user: userId }).sort({ checkIn: -1 }).populate('branch device');
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.manualAttendance = async (req, res) => {
    try {
        const { userId, branchId, status, reason } = req.body;
        const attendance = new Attendance({
            user: userId,
            branch: branchId,
            method: 'Manual',
            status: status || 'allowed',
            reason: reason || 'Manual entry by staff'
        });
        await attendance.save();
        res.status(201).json({ message: "Attendance logged manually", attendance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
