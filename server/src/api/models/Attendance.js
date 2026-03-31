const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    device: { type: mongoose.Schema.Types.ObjectId, ref: 'IoTDevice' },
    checkIn: { type: Date, default: Date.now },
    checkOut: { type: Date },
    method: { type: String, enum: ['QR', 'RFID', 'Biometric', 'Manual'], default: 'QR' },
    status: { type: String, enum: ['allowed', 'denied'], default: 'allowed' },
    reason: { type: String } // Reason if denied
});

module.exports = mongoose.model('Attendance', attendanceSchema);
