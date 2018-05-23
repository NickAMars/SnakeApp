const express			        = require ("express"),
 	    app				          = express(),
	    bodyParser		      = require("body-parser"), // for put request
      methodOverride      = require("method-override"),
 	    mongoose		        = require("mongoose"),
      flash               = require("connect-flash"),
      passport            = require("passport"),
      passportLocal       = require("passport-local"),
      User                = require("./module/user"),
      indexRoutes         = require("./routes/index")
      commentRoutes       = require("./routes/comments"),
      snakeRoutes         = require("./routes/snakes"),
      seedDB              = require("./seeds"); //
let port = process.env.PORT || 8080;

		mongoose.connect(process.env.DATABASEURL);

//  seedDB();


//  mongoose.connect("mongodb://localhost/project");
		app.use(bodyParser.urlencoded({extended:true}));
//   Method override or Delete and Put request
    app.use(methodOverride("_method"));
    app.use(flash());
//  app.use(express.static("css"));// to use style sheet
		app.use(express.static(__dirname + '/css'));
//  USE IMAGES IN FILE
//		app.use(express.static("img"));
//  DONT have to include .ejs
		app.set("view engine", "ejs");

//  PASSPORT CONFIGURATION
    app.use(require("express-session")({
        secret: "Secret Code to Encript data!",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());// initialize values
    app.use(passport.session()); // start session
    passport.use(new passportLocal(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

// available on every ROUTE
//function available on every route
    app.use(function(req,res, next){
        res.locals.currentUser  = req.user; // available inside of template
        res.locals.error        = req.flash("error");
        res.locals.success      = req.flash("success");
        next();
    });
    app.use("/",indexRoutes);
    app.use("/snakes",snakeRoutes);
    app.use("/snakes/:id/comments",commentRoutes);

		app.listen(port,  () =>{
			console.log("Server Start");
		});


// app.listen(process.env.PORT, process.env.IP, function(){ console.log("We have started")})
