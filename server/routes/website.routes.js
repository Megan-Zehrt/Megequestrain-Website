const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const PostController = require('../controllers/post.controller');

router.post('/api/create/user', UserController.RegisterUser);

module.exports = router;