const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const isAuthenticated = require('../middleware/auth');

router.post('/', isAuthenticated, postController.create);
router.get('/:postId', postController.findById);
router.post('/:postId/like', isAuthenticated, postController.like);
router.post('/:postId/dislike', isAuthenticated, postController.dislike);
router.put('/:postId', isAuthenticated, postController.update);
router.delete('/:postId', isAuthenticated, postController.delete);

module.exports = router;


// Routes pour les commentaires
router.post('/:postId/comments', isAuthenticated, commentController.create);
router.post('/comments/:commentId/like', isAuthenticated, commentController.like);
router.post('/comments/:commentId/dislike', isAuthenticated, commentController.dislike);
router.put('/comments/:commentId', isAuthenticated, commentController.update);
router.delete('/comments/:commentId', isAuthenticated, commentController.delete);

module.exports = router;
