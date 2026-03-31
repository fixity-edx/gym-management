const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    durationDays: { type: Number, required: true },
    features: [String],
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }, // Optional if branch specific
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
