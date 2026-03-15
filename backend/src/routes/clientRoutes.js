const express = require('express');
const { getMyProject, getFinancials, getAssets } = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect); // All client routes require login

router.get('/project', getMyProject);
router.get('/financials', getFinancials);
router.get('/assets', getAssets);

module.exports = router;
