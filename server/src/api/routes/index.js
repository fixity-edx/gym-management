const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const iotRoutes = require('./iotRoutes');
const aiRoutes = require('./aiRoutes');
const branchRoutes = require('./branchRoutes');
const memberRoutes = require('./memberRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');
const staffRoutes = require('./staffRoutes');

router.use('/auth', authRoutes);
router.use('/iot', iotRoutes);
router.use('/ai', aiRoutes);
router.use('/branches', branchRoutes);
router.use('/members', memberRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/admin', require('./adminRoutes'));
router.use('/staff', staffRoutes);

module.exports = router;
