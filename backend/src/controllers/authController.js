const User = require('../models/User');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Setup NodeMailer Transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// @desc    Send OTP via Email (Signup)
// @route   POST /api/v1/auth/send-otp
// @access  Public
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });

    // Generate 6 digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Save/Update in DB with type 'signup'
    await OTP.findOneAndUpdate({ email }, { code, type: 'signup', createdAt: Date.now() }, { upsert: true });

    // Send Mail
    await transporter.sendMail({
      from: `"HexStack Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your HexStack Account',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0f19; padding: 40px 20px; text-align: center; border-radius: 16px; max-width: 460px; margin: 20px auto; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
          <div style="font-size: 26px; font-weight: 800; margin-bottom: 8px; color: #ffffff; letter-spacing: -0.5px;">HexStack</div>
          <p style="color: #9ca3af; font-size: 13px; margin: 0 0 20px 0;">Your secure verification code</p>
          <div style="height: 1px; background: linear-gradient(90deg, transparent, #3b82f6, transparent); margin-bottom: 24px;"></div>
          <p style="color: #d1d5db; font-size: 14px; margin-bottom: 20px; font-weight: 500;">Enter this code to verify your registration:</p>
          <div style="font-size: 32px; font-weight: 800; letter-spacing: 6px; padding: 16px; background: rgba(59, 130, 246, 0.05); border-radius: 12px; max-width: 180px; margin: 0 auto 24px auto; color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.2); box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);">
            ${code}
          </div>
          <p style="color: #6b7280; font-size: 11px; line-height: 1.5;">This code will expire in 5 minutes.<br />If you did not request this, please ignore this email.</p>
        </div>
      `
    });

    res.json({ success: true, message: 'OTP sent to email successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/v1/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, role, otp } = req.body;

    if (!otp) return res.status(400).json({ success: false, message: 'OTP is required' });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });

    // Verify OTP type='signup'
    const otpRecord = await OTP.findOne({ email, code: otp, type: 'signup' });
    if (!otpRecord) return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });

    const user = await User.create({ name, email, password, phone, role: role || 'user' });

    await OTP.deleteOne({ _id: otpRecord._id });

    if (user) {
      res.status(201).json({
        success: true,
        _id: user._id, name: user.name, email: user.email, role: user.role,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        _id: user._id, name: user.name, email: user.email, role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Forgot Password (Send Reset OTP)
// @route   POST /api/v1/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'No account found with this email' });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Save/Update in DB with type 'reset'
    await OTP.findOneAndUpdate({ email }, { code, type: 'reset', createdAt: Date.now() }, { upsert: true });

    await transporter.sendMail({
      from: `"HexStack Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset your HexStack Password',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0f19; padding: 40px 20px; text-align: center; border-radius: 16px; max-width: 460px; margin: 20px auto; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
          <div style="font-size: 26px; font-weight: 800; margin-bottom: 8px; color: #ffffff; letter-spacing: -0.5px;">HexStack</div>
          <p style="color: #ef4444; font-size: 13px; margin: 0 0 20px 0;">Password Reset Request</p>
          <div style="height: 1px; background: linear-gradient(90deg, transparent, #ef4444, transparent); margin-bottom: 24px;"></div>
          <p style="color: #d1d5db; font-size: 14px; margin-bottom: 20px; font-weight: 500;">Use this code to set a new password:</p>
          <div style="font-size: 32px; font-weight: 800; letter-spacing: 6px; padding: 16px; background: rgba(239, 68, 68, 0.05); border-radius: 12px; max-width: 180px; margin: 0 auto 24px auto; color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); box-shadow: 0 0 20px rgba(239, 68, 68, 0.1);">
            ${code}
          </div>
          <p style="color: #6b7280; font-size: 11px; line-height: 1.5;">Expired in 5 minutes.</p>
        </div>
      `
    });

    res.json({ success: true, message: 'Password reset OTP sent to email!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reset Password with OTP
// @route   POST /api/v1/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) return res.status(400).json({ success: false, message: 'All fields required' });

    const otpRecord = await OTP.findOne({ email, code: otp, type: 'reset' });
    if (!otpRecord) return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.password = newPassword;
    await user.save();

    await OTP.deleteOne({ _id: otpRecord._id });

    res.json({ success: true, message: 'Password reset successfully! You can now log in.' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
