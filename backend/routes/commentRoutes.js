const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const isAuthenticated = require('../middleware/auth');

router.post('/:postId/comments', isAuthenticated, commentController.create);
router.post('/:commentId/like', isAuthenticated, commentController.like);
router.post('/:commentId/dislike', isAuthenticated, commentController.dislike);
router.put('/:commentId', isAuthenticated, commentController.update);
router.delete('/:commentId', isAuthenticated, commentController.delete);

module.exports = router;