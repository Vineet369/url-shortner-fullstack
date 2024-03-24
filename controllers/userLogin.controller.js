const User = require('../models/userLogin.model.js')


async function handleUserSignup(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.render("/")

}

async function handleUserlogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if (!user) 
        return res.render("login", {
    error: "Invalid Username or Password",
    });
    return res.redirect("/")

}

module.exports = {
    handleUserSignup,
    handleUserlogin,
} 