const express = require('express');
const userController = require('./src/controller/user.controller');

const routes = express.Router();   

routes.use('/users', userController);

module.exports = routes;
