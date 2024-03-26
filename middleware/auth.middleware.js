const {getUser} = require('../service/auth.js')

function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookies?.token;         //req.headers["authorization"]; //takes authorization value from headers
    req.user = null;

    if(!tokenCookie )
    return next();

    const token = tokenCookie      //authorizationHeaderValue.split("Bearer ")[1] //extracted token from headers
    const user = getUser(token); //authenticated user's details are getting fetched

    req.user = user
    return next();
}

// admin , normal, etc
function restrictTo(roles = []){
    return function(req, res, next){
        if (!req.user) 
            return res.redirect("/login");
    
        if (!roles.includes(req.user.role))
            return res.end('Unaothorised');

        return next();
    }
}


// async function restrictToLoggedInUserOnly(req, res, next){
//     const userUid = req.cookies?.uid;
//     if(!userUid) return res.redirect('/login');
//     const user = await getUser(userUid);

//     if(!user) return res.redirect('/login');

//     req.user = user;
//     next();
// }

// async function checkAuth(req, res, next){    
//     const userUid = req.cookies.uid;

//     const user =await getUser(userUid);

//     req.user = user;
//     next();
// }
module.exports = {
    checkForAuthentication,
    restrictTo,  
} 