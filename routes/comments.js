const express       = require("express"),
//    MERGE the params from the campground and the comments together
      router        = express.Router({mergeParams: true}),
      Project       = require("../module/project"),
      Comments      = require("../module/comment"),
      middleware    = require("../middleware/index.js");



//  "/snakes/:id/comments/" = "/"




// COMMENT NEW --- show form for comments
router.get("/new",middleware.isLoggedIn ,(req,res) =>{
  // find snake by //
      Project.findById(req.params.id, (err, snake)=>{
            if(!err){
              res.render("comments/new", {snake: snake});
            } else{
              console.log(err);
            }
      });
});


router.post("/",middleware.isLoggedIn ,(req,res) =>{
  //  console.log(req.body.comment);
    Project.findById( req.params.id, ( err, Onesnake ) => {
    //  console.log(Onesnake);
              if(!err){
                  // Create the comments
                  Comments.create(req.body.comment,(err , comment)=>{
                      if(!err){
                        // Add user name and id to comments
                      //from comment mongoosebd     // from user
                        comment.author.id         =    req.user._id;
                        comment.author.username   =    req.user.username;
                        //Save added data inside of the comment
                        comment.save();
                            // place comment in snake
                            Onesnake.comments.push(comment);
                            //console.log(Onesnake);
                            Onesnake.save((err,snake)=>{
                                if(!err){
                                  //  console.log(snake);
                                //  req.flash("success", "Successfully added comment");
                                    res.redirect(`/snakes/${req.params.id}`);
                                }else{ console.log(err); }
                            });

                      }else {
                         req.flash("error", "Something went wrong")
                        console.log(err);}
                  });

              }else{
              console.log(err);
              req.flash("error", "Something went wrong");
              res.redirect("/snakes");
              }
    });
});

router.get("/:comment_id/edit",middleware.isLoggedIn ,(req,res) =>{
  Comments.findById(req.params.comment_id, function(err, comment){
      res.render("comments/edit", {snake_id: req.params.id ,comment: comment});
  });
});

router.put("/:comment_id", middleware.checkCommentOwnership ,(req,res) =>{
  Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment,(err, comment)=>{
    if(err) return console.log(err);
    //res.redirect("back");
      res.redirect(`/snakes/${req.params.id}`);
  });
//res.send("UPDATE METHOD!");
});

router.delete("/:comment_id", middleware.checkCommentOwnership , (req, res) => {
  //res.send("DELETE ROUTES");
      Comments.findByIdAndRemove(req.params.comment_id, (err, comment)=> {
      if(err) return console.log(err);
    //  req.flash("success", "Comment deleted");
      res.redirect(`/snakes/${req.params.id}`);
    //  console.log("delete comment")
    });
});


module.exports = router;
