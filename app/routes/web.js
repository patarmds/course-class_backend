var express = require('express');
const AuthController = require('../controllers/AuthController');


var router = express.Router();
// Auth Management
router.post('/register', AuthController.register)
.post('/login', AuthController.login)
.get('/profile', AuthController.profile)



module.exports = router;
