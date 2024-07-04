const Comment = require('../models/Comment');
const Like = require('../models/Like');
const Post = require('../models/Post');
const renderTemplate = require('../utils/renderTemplate');

exports.create = async (req, res) => {
  const { content } = req.body;
  const userId = req.session.userId;
  const { postId } = req.params;

  if (!content || !postId || !userId) {
    req.flash('error', 'All fields are required.');
    return res.redirect(`/posts/${postId}`);
  }

  try {
    await Comment.create(userId, postId, content);
    req.flash('success', 'Comment created successfully.');
    res.redirect(`/posts/${postId}`);
  } catch (error) {
    req.flash('error', error.message);
    res.redirect(`/posts/${postId}`);
  }
};

exports.like = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.session.userId;

  try {
    const existingLike = await Like.findByUserAndComment(userId, commentId);

    if (existingLike) {
      if (existingLike.type === 'dislike') {
        await Like.delete(existingLike.id);
        await Comment.like(commentId);
        req.flash('success', 'Comment liked.');
      }
    } else {
      await Like.create(userId, null, commentId, 'like');
      await Comment.like(commentId);
      req.flash('success', 'Comment liked.');
    }
  } catch (error) {
    req.flash('error', error.message);
  }

  const comment = await Comment.findById(commentId);
  res.redirect(`/posts/${comment.post_id}`);
};

exports.dislike = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.session.userId;

  try {
    const existingLike = await Like.findByUserAndComment(userId, commentId);

    if (existingLike) {
      if (existingLike.type === 'like') {
        await Like.delete(existingLike.id);
        await Comment.dislike(commentId);
        req.flash('success', 'Comment disliked.');
      }
    } else {
      await Like.create(userId, null, commentId, 'dislike');
      await Comment.dislike(commentId);
      req.flash('success', 'Comment disliked.');
    }
  } catch (error) {
    req.flash('error', error.message);
  }

  const comment = await Comment.findById(commentId);
  res.redirect(`/posts/${comment.post_id}`);
};

exports.update = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const comment = await Comment.findById(commentId);
  const userId = req.session.userId;

  if (comment.user_id === userId || req.session.isAdmin) {
    await Comment.update(commentId, content);
    req.flash('success', 'Comment updated successfully.');
  } else {
    req.flash('error', 'You do not have permission to update this comment.');
  }
  res.redirect(`/posts/${comment.post_id}`);
};

exports.delete = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  const userId = req.session.userId;

  if (comment.user_id === userId || req.session.isAdmin) {
    await Comment.delete(commentId);
    req.flash('success', 'Comment deleted successfully.');
  } else {
    req.flash('error', 'You do not have permission to delete this comment.');
  }
  res.redirect(`/posts/${comment.post_id}`);
};
