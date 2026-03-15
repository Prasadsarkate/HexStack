const Project = require('../models/Project');

// @desc    Get Client Project Details
// @route   GET /api/v1/client/project
// @access  Private (Client only)
exports.getMyProject = async (req, res) => {
  try {
    // Find project where client_id matches the logged in user
    const project = await Project.findOne({ client_id: req.user.id });

    if (!project) {
      return res.status(200).json({ success: true, data: null });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Financial Assets (Figma, Docs URLs)
// @route   GET /api/v1/client/assets
// @access  Private (Client only)
exports.getAssets = async (req, res) => {
  try {
    const project = await Project.findOne({ client_id: req.user.id }).select('files_url title');

    if (!project) {
      return res.status(200).json({ success: true, assets: [] });
    }

    res.json({ success: true, assets: project.files_url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// @desc    Get Financial stats for specific project
exports.getFinancials = async (req, res) => {
  try {
    const project = await Project.findOne({ client_id: req.user.id }).select('total_budget paid_amount');
    if (!project) return res.status(200).json({ success: true, financials: null });

    res.json({
      success: true,
      financials: {
        total_budget: project.total_budget,
        paid_amount: project.paid_amount,
        remaining_balance: project.total_budget - project.paid_amount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
