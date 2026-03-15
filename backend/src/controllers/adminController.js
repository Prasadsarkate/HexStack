const User = require('../models/User');
const Project = require('../models/Project');
const Inquiry = require('../models/Inquiry');

// @desc    Get Admin Stats
// @route   GET /api/v1/admin/stats
// @access  Private (Admin only)
exports.getStats = async (req, res) => {
  try {
    const totalClients = await User.countDocuments({ role: 'user' });
    const activeProjects = await Project.countDocuments({ status: 'Active' });
    const pendingLeads = await Inquiry.countDocuments({ status: 'New' });

    // Aggregate Total Revenue (Sum of total_budget)
    const revenueStats = await Project.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$total_budget' } } },
    ]);
    const totalRevenue = revenueStats[0]?.total || 0;

    res.json({
      success: true,
      stats: {
        totalClients,
        activeProjects,
        pendingLeads,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Users CRUD
// @route   GET /api/v1/admin/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }); // Only fetch 'user' role for admin view
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get All Projects
// @route   GET /api/v1/admin/projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('client_id', 'name email');
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create Project for Client
// @route   POST /api/v1/admin/projects
exports.createProject = async (req, res) => {
  try {
    const { client_id, title, description, total_budget, deadline } = req.body;

    // Optional: Check if project already exists for this client to avoid duplicates
    const existing = await Project.findOne({ client_id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Project already exists for this client.' });
    }

    const project = await Project.create({
      client_id,
      title,
      description,
      total_budget: Number(total_budget),
      deadline: deadline ? new Date(deadline) : undefined,
      current_stage: 'Discovery',
      progress: 0,
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update Project Progress/Status
// @route   PUT /api/v1/admin/projects/:id
exports.updateProject = async (req, res) => {

  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get Inquiries
// @route   GET /api/v1/admin/leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// @desc    Update Inquiry Status
// @route   PUT /api/v1/admin/leads/:id
exports.updateLeadStatus = async (req, res) => {
  try {
    const lead = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete User
// @route   DELETE /api/v1/admin/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    await Project.deleteMany({ client_id: req.params.id }); 
    await user.deleteOne();

    res.json({ success: true, message: 'User and associated projects removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete Lead
// @route   DELETE /api/v1/admin/leads/:id
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Inquiry.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });

    await lead.deleteOne();
    res.json({ success: true, message: 'Lead purged successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Add Invoice / Payment to Project
// @route   POST /api/v1/admin/projects/:id/invoice
exports.addInvoice = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    const { invoice_id, amount, status, date } = req.body;
    
    project.payments.push({
      invoice_id,
      amount: Number(amount),
      status: status || 'Pending',
      date: date || Date.now()
    });

    if (status === 'Paid') {
      project.paid_amount += Number(amount);
    }

    await project.save();
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Add File to Project
// @route   POST /api/v1/admin/projects/:id/files
exports.addFile = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    const { name, url } = req.body;
    if (!name || !url) return res.status(400).json({ success: false, message: 'Name and URL required' });

    project.files_url.push({ name, url });

    await project.save();
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


