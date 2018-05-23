const Project       = require("../module/project"),
      Comments      = require("../module/comment");
var middlewareObj = {};

middlewareObj.checkSnakeOwnership = function(req,res, next){
      if(req.isAuthenticated()){
        Project.findById(req.params.id, function(err, foundSnake){
          if(err) {
            req.flash("error", "campground not found")
            return res.redirect("back");// retirect back
          }
          if(foundSnake.author.id.equals(req.user.id)) return next(); // did user post that
          req.flash("error","You Don't have permission to do that");
          res.redirect("back"); // retirect back
        });
      } else {
        req.flash("error","You need to be logged in");
        res.redirect("/login"); // retirect back}
     }
}

middlewareObj.checkCommentOwnership =function(req,res, next){
      if(req.isAuthenticated()){
        Comments.findById(req.params.comment_id, function(err, foundComment){
          if(err){
            return res.redirect("back");// retirect back
          }
          if(foundComment.author.id.equals(req.user.id)) return next(); // did user post that
          req.flash("error", "You Dont Have Permission");
          res.redirect("back"); // retirect back
        });
      } else {
        req.flash("error","You need to be logged in");
        res.redirect("/login"); // retirect back}
     }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error","You Need To Be Login!");
    res.redirect("/login");
}




module.exports = middlewareObj;
