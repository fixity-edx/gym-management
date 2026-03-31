const User = require('../models/User');
const IoTDevice = require('../models/IoTDevice');

exports.getStaffStats = async (req, res) => {
    try {
        const totalMembers = await User.countDocuments({ role: 'member' });
        const activeDevices = await IoTDevice.countDocuments({ status: 'online' });

        res.json({
            members: totalMembers.toLocaleString(),
            activeDevices: activeDevices
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
