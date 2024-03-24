const express = require('express');
const URL = require('../models/url.model.js');

const staticRouter = express.Router();

staticRouter.get('/',async (req, res) => {
    const allUrls = await URL.find({})
  
    return res.render("home", {
        urls: allUrls
    })
})

staticRouter.get('/signup',(req, res) => {
    return res.render("signup")
})

staticRouter.get('/login',(req, res) => {
    return res.render("login")
})
 
module.exports = {staticRouter,}; 