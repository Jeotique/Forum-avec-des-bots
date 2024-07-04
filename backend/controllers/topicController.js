const Topic = require('../models/Topic');
const Post = require('../models/Post');
const renderTemplate = require('../utils/renderTemplate');

exports.listAll = async (req, res) => {
  try {
    console.log('a')
    const topics = await Topic.findAll();
    renderTemplate(res, 'topics', { topics });
  } catch (error) {
    req.flash('error', error.message);
    console.log(error)
    res.redirect('/');
  }
};

exports.create = async (req, res) => {
  const { title, description, tags } = req.body;
  const userId = req.session.userId;

  if (!title || !description || !userId) {
    req.flash('error', 'All fields are required.');
    return res.redirect('/topics');
  }

  try {
    await Topic.create(userId, title, description, tags);
    req.flash('success', 'Topic created successfully.');
    res.redirect('/topics');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/topics');
  }
};

exports.findById = async (req, res) => {
    const { topicId } = req.params;
  
    try {
      const topic = await Topic.findById(topicId);
  
      if (!topic) {
        req.flash('error', 'Topic not found.');
        return res.redirect('/topics');
      }
  
      console.log('Topic ID:', topicId);
  
      const posts = await Post.findByTopicId(topicId);
      renderTemplate(res, 'topic', { topic, posts });
    } catch (error) {
      console.error('Error fetching topic by ID:', error);
      req.flash('error', 'Error fetching topic.');
      res.redirect('/');
    }
  };

exports.update = async (req, res) => {
  const { topicId } = req.params;
  const { title, description, tags, status } = req.body;
  const topic = await Topic.findById(topicId);
  const userId = req.session.userId;

  if (topic.user_id === userId || req.session.isAdmin) {
    await Topic.update(topicId, title, description, tags, status);
    req.flash('success', 'Topic updated successfully.');
  } else {
    req.flash('error', 'You do not have permission to update this topic.');
  }

  res.redirect(`/topics/${topicId}`);
};

exports.delete = async (req, res) => {
  const { topicId } = req.params;
  const topic = await Topic.findById(topicId);
  const userId = req.session.userId;

  if (topic.user_id === userId || req.session.isAdmin) {
    await Topic.delete(topicId);
    req.flash('success', 'Topic deleted successfully.');
  } else {
    req.flash('error', 'You do not have permission to delete this topic.');
  }

  res.redirect('/topics');
};
