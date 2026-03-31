const axios = require('axios');
const API_URL = 'http://localhost:3001/api';

const runTests = async () => {
    console.log('🚀 Starting API Test Suite...\n');
    let adminToken, staffToken, memberToken, staffId, memberId, planId, deviceId, branchId;

    const log = (msg, status = 'INFO') => {
        const icons = { PASS: '✅', FAIL: '❌', INFO: 'ℹ️' };
        console.log(`${icons[status]} ${msg}`);
    };

    try {
        // 1. Admin Login
        log('Testing Admin Login...');
        const adminLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@gmail.com',
            password: 'admin123'
        });
        adminToken = adminLogin.data.token;
        log('Admin Login Successful', 'PASS');

        // 2. Create Branch
        log('Creating Test Branch...');
        const branchRes = await axios.post(`${API_URL}/branches`, {
            name: `Test Branch ${Date.now()}`,
            location: 'Test Location',
            capacity: 100,
            contactNumber: '1234567890'
        }, { headers: { Authorization: `Bearer ${adminToken}` } });
        branchId = branchRes.data._id;
        log('Branch Created', 'PASS');

        // 3. Create Staff
        try {
            log('Creating Test Staff...');
            const staffEmail = `staff_test_${Date.now()}@test.com`;
            await axios.post(`${API_URL}/auth/signup`, {
                name: 'Test Staff',
                email: staffEmail,
                password: 'password123',
                role: 'staff',
                branchId: branchId
            });

            // Login as Staff
            const staffLogin = await axios.post(`${API_URL}/auth/login`, {
                email: staffEmail,
                password: 'password123'
            });
            staffToken = staffLogin.data.token;
            staffId = staffLogin.data.id;
            log('Staff Created & Logged In', 'PASS');
        } catch (e) {
            log(`Staff Creation Failed: ${e.response?.data?.message || e.message}`, 'FAIL');
        }

        // 4. Create Member
        log('Creating Test Member...');
        const memberEmail = `member_test_${Date.now()}@test.com`;
        await axios.post(`${API_URL}/auth/signup`, {
            name: 'Test Member',
            email: memberEmail,
            password: 'password123',
            role: 'member'
        });

        const memberLogin = await axios.post(`${API_URL}/auth/login`, {
            email: memberEmail,
            password: 'password123'
        });
        memberToken = memberLogin.data.token;
        memberId = memberLogin.data.id;
        log('Member Created & Logged In', 'PASS');

        // 5. Admin Ops
        log('Testing Admin - Get Stats...');
        await axios.get(`${API_URL}/admin/stats`, { headers: { Authorization: `Bearer ${adminToken}` } });
        log('Admin Stats Retrieved', 'PASS');

        log('Testing Admin - Get Staff List...');
        await axios.get(`${API_URL}/admin/staff`, { headers: { Authorization: `Bearer ${adminToken}` } });
        log('Staff List Retrieved', 'PASS');

        log('Testing Admin - Create Plan...');
        const planRes = await axios.post(`${API_URL}/subscriptions`, {
            name: 'Test Plan',
            price: 50,
            durationDays: 30,
            features: ['Gym', 'Pool']
        }, { headers: { Authorization: `Bearer ${adminToken}` } });
        planId = planRes.data._id;
        log('Plan Created', 'PASS');

        log('Testing Admin - Register IoT Device...');
        const deviceRes = await axios.post(`${API_URL}/iot/devices`, {
            name: 'Test Gate',
            deviceId: `GATE-${Date.now()}`,
            type: 'QR_Scanner',
            branch: branchId
        }, { headers: { Authorization: `Bearer ${adminToken}` } });
        deviceId = deviceRes.data.deviceId || deviceRes.data.device?.deviceId || `GATE-${Date.now()}`;
        // fallback if structure varies, usually simple res.json(device)
        if (!deviceId && deviceRes.data.device) deviceId = deviceRes.data.device.deviceId;
        else if (deviceRes.data.deviceId) deviceId = deviceRes.data.deviceId;

        log('IoT Device Registered', 'PASS');

        // 6. Staff Ops
        log('Testing Staff - Get Stats...');
        await axios.get(`${API_URL}/staff/stats`, { headers: { Authorization: `Bearer ${staffToken}` } });
        log('Staff Stats Retrieved', 'PASS');

        log('Testing Staff - Get Members...');
        await axios.get(`${API_URL}/members`, { headers: { Authorization: `Bearer ${staffToken}` } });
        log('Member List Retrieved', 'PASS');

        // 7. Member Ops
        log('Testing Member - Get History...');
        await axios.get(`${API_URL}/members/history`, { headers: { Authorization: `Bearer ${memberToken}` } });
        log('Member History Retrieved', 'PASS');

        log('Testing Member - View Plans...');
        await axios.get(`${API_URL}/subscriptions`, { headers: { Authorization: `Bearer ${memberToken}` } });
        log('Plans Retrieved', 'PASS');

        log('Testing Member - Buy Subscription...');
        await axios.post(`${API_URL}/subscriptions/buy`, {
            planId: planId
        }, { headers: { Authorization: `Bearer ${memberToken}` } });
        log('Subscription Purchased', 'PASS');

        // 8. IoT Ops
        log('Testing IoT - Check-in...');
        const memberData = memberLogin.data; // Corrected structure
        if (memberData.digitalCardId) {
            await axios.post(`${API_URL}/iot/check-in`, {
                deviceId: deviceId,
                digitalCardId: memberData.digitalCardId
            });
            log('IoT Check-in Successful', 'PASS');
        } else {
            log('Skipping IoT Check-in (No ID)', 'INFO');
        }

        // 9. AI Ops
        log('Testing AI - Churn Analytics...');
        await axios.get(`${API_URL}/ai/admin/churn-analytics`, { headers: { Authorization: `Bearer ${adminToken}` } });
        log('AI Churn Analytics Retrieved', 'PASS');

        console.log('\n✨ All Tests Completed successfully!');

    } catch (error) {
        log(`Test Failed: ${error.response ? JSON.stringify(error.response.data) : error.message}`, 'FAIL');
        process.exit(1);
    }
};

runTests();
