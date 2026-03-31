const aiService = require('../utils/aiService');
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const SubscriptionPlan = require('../models/SubscriptionPlan');

exports.getMemberAttendanceSummary = async (req, res) => {
    try {
        const userId = req.userId;
        const history = await Attendance.find({ user: userId }).sort({ checkIn: -1 }).limit(10);
        const summary = await aiService.getAttendanceSummary(history);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMemberRenewalRecommendation = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const plans = await SubscriptionPlan.find({ isActive: true });
        const recommendation = await aiService.getRenewalRecommendation(user, plans);
        res.json({ recommendation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAdminChurnAnalytics = async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId) {
            const user = await User.findById(userId);
            const history = await Attendance.find({ user: userId }).sort({ checkIn: -1 }).limit(20);
            const analytics = await aiService.getChurnRisk(user, history);
            return res.json({ analytics });
        }

        // Analyze all active members for dashboard
        const members = await User.find({ role: 'member', status: 'active' }).limit(50); // specific limit for performance
        const riskMembers = [];

        for (const member of members) {
            const history = await Attendance.find({ user: member._id }).sort({ checkIn: -1 }).limit(5); // fast lookups
            const risk = await aiService.getChurnRisk(member, history);

            if (risk.riskScore > 50) {
                riskMembers.push({
                    id: member._id,
                    name: member.name,
                    riskScore: risk.riskScore,
                    reason: risk.prediction
                });
            }
        }

        // Sort by highest risk
        riskMembers.sort((a, b) => b.riskScore - a.riskScore);

        res.json({ riskMembers: riskMembers.slice(0, 10) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAdminBranchInsights = async (req, res) => {
    try {
        const { branchId } = req.params;
        // Mocking some branch performance data for AI analysis
        const branchData = { id: branchId, totalMembers: 150, activeDevices: 3 };
        const revenueData = { monthlyRevenue: 5000, churnRate: "5%" };
        const insights = await aiService.getBranchPerformance(branchData, revenueData);
        res.json({ insights });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
