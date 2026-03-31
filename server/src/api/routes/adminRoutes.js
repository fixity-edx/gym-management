const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

router.get('/stats', verifyToken, isAdmin, controller.getAdminStats);
router.get('/staff', verifyToken, isAdmin, controller.getStaff);

module.exports = router;
