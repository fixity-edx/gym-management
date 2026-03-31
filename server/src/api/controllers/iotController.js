const IoTDevice = require('../models/IoTDevice');
const User = require('../models/User');
const Attendance = require('../models/Attendance');

exports.iotCheckIn = async (req, res) => {
    try {
        const { deviceId, digitalCardId } = req.body;

        const device = await IoTDevice.findOne({ deviceId });
        if (!device) {
            return res.status(404).json({ response: "deny", message: "Device not registered" });
        }

        // Update heartbeat
        device.lastHeartbeat = new Date();
        await device.save();

        const user = await User.findOne({ digitalCardId });
        if (!user) {
            return res.status(404).json({ response: "deny", message: "Invalid card ID" });
        }

        // Check subscription
        if (!user.subscription.isActive || new Date(user.subscription.endDate) < new Date()) {
            // Log denied attendance
            const attendance = new Attendance({
                user: user._id,
                branch: device.branch,
                device: device._id,
                method: device.type.includes('QR') ? 'QR' : 'RFID',
                status: 'denied',
                reason: 'Expired subscription'
            });
            await attendance.save();
            return res.json({ response: "deny", message: "Subscription expired" });
        }

        // Check if user is frozen
        if (user.status === 'frozen') {
            const attendance = new Attendance({
                user: user._id,
                branch: device.branch,
                device: device._id,
                method: device.type.includes('QR') ? 'QR' : 'RFID',
                status: 'denied',
                reason: 'Membership frozen'
            });
            await attendance.save();
            return res.json({ response: "deny", message: "Membership frozen" });
        }

        // All good, log allowed attendance
        const attendance = new Attendance({
            user: user._id,
            branch: device.branch,
            device: device._id,
            method: device.type.includes('QR') ? 'QR' : 'RFID',
            status: 'allowed'
        });
        await attendance.save();

        res.json({
            response: "allow",
            message: `Welcome, ${user.name}!`,
            userName: user.name
        });
    } catch (error) {
        res.status(500).json({ response: "deny", message: error.message });
    }
};

exports.getDevices = async (req, res) => {
    try {
        const devices = await IoTDevice.find().populate('branch');
        res.json(devices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateHeartbeat = async (req, res) => {
    try {
        const { deviceId } = req.body;
        const device = await IoTDevice.findOne({ deviceId });
        if (!device) return res.status(404).json({ message: "Device not found" });
        device.lastHeartbeat = new Date();
        device.status = 'online';
        await device.save();
        res.json({ message: "Heartbeat received", status: "online" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.registerDevice = async (req, res) => {
    try {
        const device = new IoTDevice(req.body);
        await device.save();
        res.status(201).json(device);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteDevice = async (req, res) => {
    try {
        await IoTDevice.findByIdAndDelete(req.params.id);
        res.json({ message: "Device deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
