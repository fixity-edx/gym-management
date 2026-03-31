const mongoose = require('mongoose');
const User = require('./src/api/models/User');
const Branch = require('./src/api/models/Branch');
const SubscriptionPlan = require('./src/api/models/SubscriptionPlan');
const IoTDevice = require('./src/api/models/IoTDevice');
const Attendance = require('./src/api/models/Attendance');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({ role: { $ne: 'admin' } });
        await Branch.deleteMany({});
        await SubscriptionPlan.deleteMany({});
        await IoTDevice.deleteMany({});
        await Attendance.deleteMany({});

        // Create Branches
        const branches = await Branch.insertMany([
            { name: 'Downtown Powerhouse', location: '123 Main St, Downtown', contactNumber: '555-0101', capacity: 200 },
            { name: 'Westside Fitness Hub', location: '456 West Blvd, Westside', contactNumber: '555-0102', capacity: 150 },
            { name: 'Elite Performance Center', location: '789 East Rd, Uptown', contactNumber: '555-0103', capacity: 300 }
        ]);

        // Create Subscription Plans
        const plans = await SubscriptionPlan.insertMany([
            { name: 'Basic Monthly', price: 29.99, durationDays: 30, features: ['Gym Access', 'Locker Room'] },
            { name: 'Elite Annual', price: 299.99, durationDays: 365, features: ['All Branch Access', 'Personal Trainer', 'Pool & Sauna'] },
            { name: 'Quarterly Pro', price: 79.99, durationDays: 90, features: ['Gym Access', 'Group Classes'] }
        ]);

        // Create IoT Devices
        await IoTDevice.insertMany([
            { deviceId: 'DEV-DT-QR-01', name: 'Downtown Entry QR', type: 'QR_Scanner', branch: branches[0]._id },
            { deviceId: 'DEV-WS-RFID-01', name: 'Westside Side Entry', type: 'RFID_Reader', branch: branches[1]._id },
            { deviceId: 'DEV-UP-BIO-01', name: 'Uptown VIP Turnstile', type: 'Biometric_Scanner', branch: branches[2]._id },
            { deviceId: 'DEV-SIM-001', name: 'Staff Simulator Terminal', type: 'QR_Scanner', branch: branches[0]._id }
        ]);

        // Create a Member
        const member = new User({
            name: 'John Member',
            email: 'member@gmail.com',
            password: 'password123',
            role: 'member',
            branch: branches[0]._id,
            digitalCardId: 'GYM-JOHN123',
            subscription: {
                plan: plans[1].name,
                startDate: new Date(),
                endDate: new Date(new Date().setDate(new Date().getDate() + 365)),
                isActive: true
            }
        });
        await member.save();

        // Create Sample Attendance for AI Analysis
        const today = new Date();
        await Attendance.insertMany([
            { user: member._id, branch: branches[0]._id, device: branches[0]._id, checkIn: new Date(today.getTime() - 86400000 * 1), method: 'QR', status: 'allowed' }, // Yesterday
            { user: member._id, branch: branches[0]._id, device: branches[0]._id, checkIn: new Date(today.getTime() - 86400000 * 3), method: 'RFID', status: 'allowed' }, // 3 days ago
            { user: member._id, branch: branches[1]._id, device: branches[1]._id, checkIn: new Date(today.getTime() - 86400000 * 5), method: 'QR', status: 'allowed' }, // 5 days ago
            { user: member._id, branch: branches[0]._id, device: branches[0]._id, checkIn: new Date(today.getTime() - 86400000 * 7), method: 'Biometric', status: 'allowed' }, // 7 days ago
            { user: member._id, branch: branches[0]._id, device: branches[0]._id, checkIn: new Date(today.getTime() - 86400000 * 10), method: 'QR', status: 'allowed' } // 10 days ago
        ]);

        // Create a Staff
        const staff = new User({
            name: 'Jane Staff',
            email: 'staff@gmail.com',
            password: 'password123',
            role: 'staff',
            branch: branches[0]._id
        });
        await staff.save();

        console.log('Seeding complete!');
        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
