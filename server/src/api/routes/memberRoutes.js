const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { verifyToken, isStaff, isMember, isAdmin } = require('../middlewares/auth');

router.get('/', verifyToken, isStaff, memberController.getAllMembers);
router.get('/history', verifyToken, isMember, memberController.getAttendanceHistory);
router.get('/history/:userId', verifyToken, isStaff, memberController.getAttendanceHistory);
router.get('/:id', verifyToken, isStaff, memberController.getMemberById);
router.put('/:id/status', verifyToken, isStaff, memberController.updateMemberStatus);
router.post('/manual-attendance', verifyToken, isStaff, memberController.manualAttendance);

module.exports = router;
