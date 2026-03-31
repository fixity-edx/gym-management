const express = require('express');
const router = express.Router();
const controller = require('../controllers/staffController');
const { verifyToken, isStaff } = require('../middlewares/auth');

router.get('/stats', verifyToken, isStaff, controller.getStaffStats);

module.exports = router;
