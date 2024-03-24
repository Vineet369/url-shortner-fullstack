const express = require('express');
const {handleUserSignup, handleUserlogin} = require('../controllers/userLogin.controller.js')

const userRoute  = express.Router();

userRoute.post('/',handleUserSignup)
userRoute.post('/login',handleUserlogin)

module.exports = {userRoute} 