const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')   
const {restrictToLoggedInUserOnly,checkAuth} = require('./middleware/auth.middleware.js');
const { connectToMongoDB } = require('./connect.js');

const URL = require('./models/url.model.js')

const router = require('./routes/url.routes.js')
const staticRouter = require('./routes/static.routes.js')  
const userRoute = require('./routes/userLogin.routes.js')  

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb+srv://bloodbankmanagement:bloodbank@clusterbloodban.7cf1bky.mongodb.net/url-shortner');
 
app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

app.use('/',checkAuth, staticRouter)
app.use('/url',restrictToLoggedInUserOnly, router)
app.use('/user', userRoute)

 
app.get('/url/:shortId',async (req, res) =>{
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectURL);
})
 

app.listen(PORT, () => console.log(`listening on port ${PORT}`)); 