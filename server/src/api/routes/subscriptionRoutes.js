const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { verifyToken, isAdmin, isMember, isStaff } = require('../middlewares/auth');

router.get('/', subscriptionController.getPlans);
router.post('/', verifyToken, isAdmin, subscriptionController.createPlan);
router.put('/:id', verifyToken, isAdmin, subscriptionController.updatePlan);
router.delete('/:id', verifyToken, isAdmin, subscriptionController.deletePlan);
router.post('/buy', verifyToken, isMember, subscriptionController.buySubscription);

module.exports = router;
