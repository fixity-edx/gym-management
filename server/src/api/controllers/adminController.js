const User = require('../models/User');
const Branch = require('../models/Branch');
const SubscriptionPlan = require('../models/SubscriptionPlan');
const Attendance = require('../models/Attendance');
const IoTDevice = require('../models/IoTDevice');

exports.getAdminStats = async (req, res) => {
    try {
        const totalMembers = await User.countDocuments({ role: 'member' });
        const totalBranches = await Branch.countDocuments();
        const activeDevices = await IoTDevice.countDocuments({ status: 'online' });

        // Simple mock revenue calculation based on active subscriptions
        const activeMembersCount = await User.countDocuments({ role: 'member', 'subscription.isActive': true });
        // Assume $50 average plan for simplicity
        const revenue = activeMembersCount * 50;

        // Calculate simple churn stat (inactive / total)
        const churnRate = totalMembers > 0 ? (100 - (activeMembersCount / totalMembers * 100)).toFixed(1) : 0;

        res.json({
            revenue: `$${revenue.toLocaleString()}`,
            members: totalMembers.toLocaleString(),
            churn: `${churnRate}%`,
            activeBranches: totalBranches,
            activeDevices: activeDevices
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStaff = async (req, res) => {
    try {
        const staff = await User.find({ role: 'staff' }).populate('branch');
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
