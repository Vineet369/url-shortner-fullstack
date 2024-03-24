const shortid = require('shortid');
const URL = require('../models/url.model.js');

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url required'})
    const shortID = shortid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    })
    return res.render("home",{ id: shortID });
}

module.exports ={
    handleGenerateNewShortURL,
}   