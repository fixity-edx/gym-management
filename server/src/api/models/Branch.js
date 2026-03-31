const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contactNumber: { type: String },
    operatingHours: { type: String },
    capacity: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Branch', branchSchema);
