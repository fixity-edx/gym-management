const express = require('express');
const router = express.Router();
const iotController = require('../controllers/iotController');
const { verifyToken, isAdmin, isStaff } = require('../middlewares/auth');

router.post('/check-in', iotController.iotCheckIn);
router.post('/heartbeat', iotController.updateHeartbeat);

router.get('/devices', verifyToken, isStaff, iotController.getDevices);
router.post('/devices', verifyToken, isAdmin, iotController.registerDevice);
router.delete('/devices/:id', verifyToken, isAdmin, iotController.deleteDevice);

module.exports = router;
