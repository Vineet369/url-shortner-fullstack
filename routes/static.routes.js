const express = require('express');
const URL = require('../models/url.model.js');
const { restrictTo } = require('../middleware/auth.middleware.js');

const staticRouter = express.Router();

staticRouter.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {
    
    const allUrls = await URL.find({})
  
    return res.render("home", {
        urls: allUrls,
    })
})

staticRouter.get('/',restrictTo(['NORMAL', 'ADMIN']),async (req, res) => {
    
    const allUrls = await URL.find({createdBy: req.user._id})
  
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
 
module.exports = staticRouter;    