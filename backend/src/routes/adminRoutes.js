const express = require('express');
const { getStats, getUsers, getProjects, createProject, updateProject, getLeads, updateLeadStatus, deleteUser, addInvoice, deleteLead, addFile } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const router = express.Router();

// Apply protect AND authorize('admin') to all routes in this file
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getStats);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.get('/projects', getProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.post('/projects/:id/invoice', addInvoice);
router.post('/projects/:id/files', addFile);
 router.get('/leads', getLeads);
router.put('/leads/:id', updateLeadStatus);
router.delete('/leads/:id', deleteLead);

module.exports = router;
