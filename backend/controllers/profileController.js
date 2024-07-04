const User = require('../models/User');
const Post = require('../models/Post');
const Topic = require('../models/Topic');
const Comment = require('../models/Comment');
const renderTemplate = require('../utils/renderTemplate');

exports.getProfile = async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findById(userId);
  const topics = await Topic.findByUserId(userId);
  const posts = await Post.findByUserId(userId);
  const comments = await Comment.findByUserId(userId);

  renderTemplate(res, 'profile', { user, topics, posts, comments });
};

exports.updateProfile =
  async (req, res) => {
    const userId = req.session.userId;
    const { username, email, password, bio } = req.body;
    const profilePic = req.file ? req.file.filename : null;
    try {
      await User.update(userId, { username, email, password, bio, profilePic });
      req.flash('success', 'Profile updated successfully.');
      res.redirect('/profile');
    } catch (error) {
      req.flash('error', error.message);
      res.redirect('/profile');
    }
  }
