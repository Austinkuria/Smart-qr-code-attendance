const express = require('express');
const Router = express.Router();
const UsersCtrls = require('../controllers/usersCtrls');
const auth = require('../middleware/auth');

// Route for logging in
Router.post('/login', UsersCtrls.login);

// Route for updating the password
Router.put('/:userId/update-password', UsersCtrls.updatePassword);

// Route to get a user's name by userId
Router.get('/:userId/name', auth, UsersCtrls.getUserNameById);

// Route to get a user by userId
Router.get('/:userId', auth, UsersCtrls.getUserById);

// Route to get all users
Router.get('/getAll', UsersCtrls.getAllUsers);

// **New Route to create a user profile**:
Router.post('/create-user', UsersCtrls.createUser); // Use createUser here


module.exports = Router;
