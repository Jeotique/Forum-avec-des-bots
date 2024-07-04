const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const isAuthenticated = require('../middleware/auth');

router.get('/', topicController.listAll);  // Route pour lister tous les topics
router.post('/', isAuthenticated, topicController.create);
router.get('/:topicId', topicController.findById);
router.put('/:topicId', isAuthenticated, topicController.update);
router.delete('/:topicId', isAuthenticated, topicController.delete);

module.exports = router;
