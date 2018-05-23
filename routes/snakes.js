const express       = require("express"),
      Project       = require("../module/project"),
      Comments      = require("../module/comment"),
      middleware    = require("../middleware"); // index.js is home file so we could take it off here
      router        = express.Router();


//  "/" = "/snakes/"




//INDEX -- show first page
router.get("/", (req, res) => {
//  console.log(req.user);
          Project.find({},
              (err, allSnakes) => {
                  if(!err){
                    res.render("snakes/index", {snakes: allSnakes});
                  }
          });
});

// CREATE -- creates a new snake on submition of the form
router.post("/",middleware.isLoggedIn,(req, res) => {
                      //	res.send("YOU HIT POST ROUTE"); test with Postman
                        // let name = req.body.name;
                        // let image = req.body.image;
                        // let description = req.body.description;
                        // req.body.snakes
                        const author = {
                        id:req.user._id,
                        username:req.user.username
                        }
                        // let newSnakes = {name: name, image: image, description: description};
                        Project.create(req.body.snakes,	(err, snakes) => {
                                                          if (!err){
                                                          snakes.author = author;
                                                        //  console.log(snakes);
                                                          snakes.save();
                                                          res.redirect("/snakes"); // go back to campground
                                                        } else {console.log(err);}
                        });
});
// NEW -- goes to the form
router.get("/new",middleware.isLoggedIn, (req,res) => {
        res.render("snakes/new");
});


// SHOW -- show image and descriptions with comments
router.get("/:id", (req,res) =>{
//var     id  = 	req.params.id;
//gives the snake and the comments of the snake
                                            // this represents the array
          Project.findById(req.params.id).populate("comments").exec( (err,Onesnake) =>{
                    if(!err){
                  //console.log(Onesnake);
                    res.render("snakes/show", {snake: Onesnake});
                  //res.render("index", {snakes: allSnakes});
                    }else {console.log(err);}
                 }
          );
        //res.send(`This is the Show page ${_id}`);
});
//EDIT SNAKES
router.get("/:id/edit", middleware.checkSnakeOwnership ,function(req, res){

    Project.findById(req.params.id ,  (err , snake)=>{
      if(err) return console.log(err);
          res.render("snakes/edit", {snake : snake});

  });
  // }else {
  //     res.redirect("/login");
  // }

//  res.send("THIS IS THE EDIT ROUTES");
});
//UPDATE SNAKES
router.put("/:id", middleware.checkSnakeOwnership ,function(req, res){ // test with post man
  // update n
  Project.findByIdAndUpdate(req.params.id, req.body.snake, (err, snake) =>{
    if(err) return console.log(err);
      res.redirect(`/snakes/${req.params.id}`);
  });
  //res.redirect("/${req.params.id}")
//  res.send("THIS IS THE UPDATE ROUTES");
});
router.delete("/:id", middleware.checkSnakeOwnership,(req, res) => {
  Project.findByIdAndRemove(req.params.id ,(err , snake) =>{
      if(err) return console.log(err);
      // need to remove all the comments that come with this as well
      //req.flash("success", "Snake deleted");
      res.redirect(`/snakes/`);
  });
});




module.exports = router;
