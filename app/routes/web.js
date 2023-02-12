var express = require('express');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');


var router = express.Router();
// Auth Management
router.post('/register', AuthController.register)
.post('/login', AuthController.login)
.get('/profile', AuthController.profile)

// User Management
router.get('/users', UserController.readUsers)
.get('/user/:id', UserController.readUser)
// .post('/user', UserController.createUser)
// .put('/user/:id', UserController.updateUser)
// .delete('/user/:id', UserController.deleteUser)

module.exports = router;
