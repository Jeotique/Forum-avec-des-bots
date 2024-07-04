const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const renderTemplate = require('../utils/renderTemplate');
const upload = require('../config/multerConfig');

exports.create = [
  upload.single('image'),
  async (req, res) => {
    const { title, content, tags } = req.body;
    const userId = req.session.userId;
    const { topicId } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !content || !topicId || !userId) {
      req.flash('error', 'All fields are required.');
      return res.redirect(`/topics/${topicId}`);
    }

    try {
      await Post.create(userId, topicId, title, content, tags, image);
      req.flash('success', 'Post created successfully.');
      res.redirect(`/topics/${topicId}`);
    } catch (error) {
      req.flash('error', error.message);
      res.redirect(`/topics/${topicId}`);
    }
  }
];

exports.findById = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  const comments = await Comment.findByPostId(postId);
  renderTemplate(res, 'post', { post, comments });
};

exports.like = async (req, res) => {
  const { postId } = req.params;
  const userId = req.session.userId;

  try {
    const existingLike = await Like.findByUserAndPost(userId, postId);

    if (existingLike) {
      if (existingLike.type === 'dislike') {
        await Like.delete(existingLike.id);
        await Post.like(postId);
        req.flash('success', 'Post liked.');
      }
    } else {
      await Like.create(userId, postId, null, 'like');
      await Post.like(postId);
      req.flash('success', 'Post liked.');
    }
  } catch (error) {
    req.flash('error', error.message);
  }

  res.redirect(`/posts/${postId}`);
};

exports.dislike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.session.userId;

  try {
    const existingLike = await Like.findByUserAndPost(userId, postId);

    if (existingLike) {
      if (existingLike.type === 'like') {
        await Like.delete(existingLike.id);
        await Post.dislike(postId);
        req.flash('success', 'Post disliked.');
      }
    } else {
      await Like.create(userId, postId, null, 'dislike');
      await Post.dislike(postId);
      req.flash('success', 'Post disliked.');
    }
  } catch (error) {
    req.flash('error', error.message);
  }

  res.redirect(`/posts/${postId}`);
};

exports.update = async (req, res) => {
  const { postId } = req.params;
  const { title, content, tags } = req.body;
  const post = await Post.findById(postId);
  const userId = req.session.userId;

  if (post.user_id === userId || req.session.isAdmin) {
    await Post.update(postId, title, content, tags);
    req.flash('success', 'Post updated successfully.');
  } else {
    req.flash('error', 'You do not have permission to update this post.');
  }

  res.redirect(`/posts/${postId}`);
};

exports.delete = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  const userId = req.session.userId;

  if (post.user_id === userId || req.session.isAdmin) {
    await Post.delete(postId);
    req.flash('success', 'Post deleted successfully.');
  } else {
    req.flash('error', 'You do not have permission to delete this post.');
  }

  res.redirect(`/topics/${post.topic_id}`);
};
