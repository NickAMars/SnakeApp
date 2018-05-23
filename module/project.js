var  		mongoose			  = require("mongoose");
//SHEMA setup
var projectSchema = new mongoose.Schema({
                     name: String,
                     image: String,
                     price: Number,
                     description:String,
                     created: {type: Date, default: Date.now},
                     comments:[{
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "Comments"
                     }],
                    author:{
                      id:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
                      },
                      username: String
                    }
                 });

//Model

 module.exports = mongoose.model("Project", projectSchema);
