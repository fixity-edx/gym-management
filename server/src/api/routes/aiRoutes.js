const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { verifyToken, isAdmin, isMember } = require('../middlewares/auth');

// Member AI features
router.get('/member/attendance-summary', verifyToken, isMember, aiController.getMemberAttendanceSummary);
router.get('/member/renewal-recommendation', verifyToken, isMember, aiController.getMemberRenewalRecommendation);

// Admin AI features
router.get('/admin/churn-analytics/:userId?', verifyToken, isAdmin, aiController.getAdminChurnAnalytics);
router.get('/admin/branch-insights/:branchId', verifyToken, isAdmin, aiController.getAdminBranchInsights);

module.exports = router;
