const User = require('../models/userLogin.model.js')
const {v4: uuidv4} = require('uuid');  
const {setUser} = require('../service/auth.js');

async function handleUserSignup(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.redirect("/")

}

async function handleUserlogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if (!user) 
        return res.render("login", {
    error: "Invalid Username or Password",
    });

    // const sessionId = uuidv4(); 
    // setUser(sessionId, user);
    const token = setUser(user);
    res.cookie('token', token); // {domain: www.xyz.com }
    return res.redirect("/")

}

module.exports = {
    handleUserSignup,
    handleUserlogin,
} 