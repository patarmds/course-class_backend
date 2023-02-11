var express = require('express');
const AuthController = require('../controllers/AuthController');


var router = express.Router();
// Auth Management
router.post('/register', AuthController.register)
.post('/login', AuthController.login)



module.exports = router;
