const express = require('express'),
      mongoose = require('mongoose'),
      path = require('path'),
      methodOverride = require("method-override"),
      session = require('express-session'),
      bodyParser = require("body-parser"),
      Blog = require("./models/blog")






const blogRoutes = require("./routes/blog");


const app = express();


app.set('view engine', 'ejs');


// const db_url = process.env.DB_URL;
// connecting databse 
// 
mongoose.connect('mongodb://localhost/my_blog', 
{useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
useUnifiedTopology: true
});


//  session configration
const sessionConfig = {
     secret: 'whatever you want',
     resave: false,
     saveUninitialized: true,
     cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    } 
};

app.use(session(sessionConfig));

// to use public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride("_method"));



// create application/json parser
const jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use((req, res, next) =>{
    res.locals.currentUser = req.user;
    next();
})

app.get("/",(req,res)=>{
    res.render('home');
})




//  Using blogRoutes
app.use(blogRoutes);


// listening to localhost...
app.listen(3000,()=>{
    console.log('server is running...');
})