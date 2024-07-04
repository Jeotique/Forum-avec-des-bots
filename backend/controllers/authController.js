const User = require('../models/User');
const bcrypt = require('bcryptjs');
const renderTemplate = require('../utils/renderTemplate');

exports.showLogin = (req, res) => {
  renderTemplate(res, 'login');
};

exports.showRegister = (req, res) => {
  renderTemplate(res, 'register');
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  await User.create(username, email, password);
  req.flash('success', 'Registration successful! Please log in.');
  res.redirect('/auth/login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.id;
    req.session.isAdmin = user.is_admin;
    req.flash('success', 'Login successful!');
    res.redirect('/');
  } else {
    req.flash('error', 'Invalid email or password.');
    res.redirect('/auth/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      req.flash('error', 'An error occurred while logging out.');
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
};

exports.banUser = async (req, res) => {
  const { userId } = req.params;
  if (req.session.isAdmin) {
    await User.ban(userId);
    req.flash('success', 'User banned successfully.');
  } else {
    req.flash('error', 'You do not have permission to perform this action.');
  }
  res.redirect('/');
};

exports.unbanUser = async (req, res) => {
  const { userId } = req.params;
  if (req.session.isAdmin) {
    await User.unban(userId);
    req.flash('success', 'User unbanned successfully.');
  } else {
    req.flash('error', 'You do not have permission to perform this action.');
  }
  res.redirect('/');
};
