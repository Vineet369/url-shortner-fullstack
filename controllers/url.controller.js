const shortid = require('shortid');
const URL = require('../models/url.model.js');

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url required'})
    const shortID = shortid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,   //req.user is present in the middleware hence it is accessible here also    
    })
    return res.render("home",{ id: shortID });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  }
 
module.exports ={
    handleGenerateNewShortURL,
    handleGetAnalytics
}   