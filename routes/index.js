const express       = require("express"),
      User          = require("../module/user"),
      passport      = require("passport"),
      middleware    = require("../middleware/index.js");
      router        = express.Router();


//  "/" = "/"
router.get("/",(req, res) =>{
    //res.render("index");
    res.render("landing"); //call get request
});
//AUTH ROUTES
//REGISTER FORM
// show register form
router.get("/register", function(req, res){
res.render("register", );
});
router.post("/register", function(req, res){
//console.log(`username: ${req.body.username},  password: ${req.body.password}`);
User.register(new User ({username:req.body.username}), req.body.password,  function(err, user){
          if(err)return console.log(err);
          passport.authenticate("local")(req,res,function(){
            res.redirect("/snakes");
          });
    });
});
//LOGIN FORM
router.get("/login", function(req, res){
res.render("login");
});
router.post("/login", passport.authenticate ("local",{
    successRedirect:"/snakes",
    failureRedirect:"/login",
}),
 function(req, res){
    res.redirect("/snakes");
});
//LOGOUT ROUTE
router.get("/logout",function(req, res){
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/snakes");
});

//app.get("*", (req, res) => res.send("This is not appart of the snakes page") );




module.exports = router;
