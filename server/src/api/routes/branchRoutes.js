const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

router.get('/', verifyToken, branchController.getBranches);
router.get('/:id', verifyToken, branchController.getBranchById);
router.post('/', verifyToken, isAdmin, branchController.createBranch);
router.put('/:id', verifyToken, isAdmin, branchController.updateBranch);
router.delete('/:id', verifyToken, isAdmin, branchController.deleteBranch);
router.post('/assign-staff', verifyToken, isAdmin, branchController.assignStaff);

module.exports = router;
