const mongoose = require('mongoose');

const iotDeviceSchema = new mongoose.Schema({
    deviceId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['QR_Scanner', 'RFID_Reader', 'Turnstile_Controller', 'Biometric_Scanner'], required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    status: { type: String, enum: ['online', 'offline', 'maintenance'], default: 'online' },
    lastHeartbeat: { type: Date, default: Date.now },
    accessRule: { type: String, default: 'standard' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IoTDevice', iotDeviceSchema);
