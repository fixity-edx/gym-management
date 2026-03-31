const SubscriptionPlan = require('../models/SubscriptionPlan');
const User = require('../models/User');

exports.createPlan = async (req, res) => {
    try {
        const plan = new SubscriptionPlan(req.body);
        await plan.save();
        res.status(201).json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPlans = async (req, res) => {
    try {
        const plans = await SubscriptionPlan.find({ isActive: true });
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePlan = async (req, res) => {
    try {
        const plan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePlan = async (req, res) => {
    try {
        const plan = await SubscriptionPlan.findById(req.params.id);
        if (!plan) return res.status(404).json({ message: "Plan not found" });
        plan.isActive = false;
        await plan.save();
        res.json({ message: "Plan deactivated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.buySubscription = async (req, res) => {
    try {
        const userId = req.userId; // Securely get ID from token
        const { planId } = req.body;

        const plan = await SubscriptionPlan.findById(planId);
        if (!plan) return res.status(404).json({ message: "Plan not found" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + plan.durationDays);

        user.subscription = {
            plan: plan.name,
            startDate,
            endDate,
            isActive: true
        };
        await user.save();
        res.json({ message: "Subscription activated", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
