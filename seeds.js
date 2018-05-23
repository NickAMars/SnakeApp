const mongoose      =     require("mongoose"),
      Project       =     require("./module/project"),
      Comments      =     require("./module/comment");

data=[{
  name:"Jararaca",
  image:"https://cdn3.list25.com/wp-content/uploads/2016/01/Jararaca-verdadeira-610x458.jpg",
  description:"The Jararaca is the best-known venomous snake in the wealthy and heavily populated areas of southeastern Brazil, where it was responsible for fifty-two percent (3,446 cases) of snakebites between 1902 and 1945 (with a 0.7 percent fatality rate. That’s 25 deaths)."
},
{
  name:"Viper",
  image:"https://cdn2.list25.com/wp-content/uploads/2016/01/24.-w-3-610x407.jpg",
  description:"Viper snakes are considered some of the most venomous reptiles in the world and they eat small animals (rats, for example), which they hunt by striking and envenomating with their deadly, paralyzing venom."
},
{
  name:"Western Green Mamba",
  image:"https://cdn.list25.com/wp-content/uploads/2016/01/23.-c-2-610x407.jpg",
  description:"The western green mamba is a very alert, nervous, and extremely agile snake that lives mainly in the coastal tropical rain forest, thicket, and woodland regions of western Africa. Like all the other mambas, the western green one is a highly venomous elapid species and its bite can kill several humans in a short period of time if it goes untreated 22"
}];

function seedDB(){





    Project.remove({}, err => { // remove all snakes
            if(!err){
              Comments.remove({}, err => {// remove all comments
                if(!err){
                //  add a  few snakes
                // for(var dataSnakes of data){
                //   Project.create(dataSnakes, (err, snake) => {
                //     if(!err){
                //
                //     Comments.create({ // create comment
                //          text:`I'm a scared of these snakes`,
                //          author:`Nicholaus Marsden`
                //          }, (err, comment) =>{
                //          if(!err){
                //            snake.comments.push(comment); // adding comment to database
                //            snake.save(err => console.log(`Comments save to Snakes`));
                //          }else{console.log(err);}
                //         });
                //
                //         console.log("Add Snakes");
                //       }else{console.log(err);}
                //   });
                // }
                  console.log("removed Comments!");
                }else{   console.log(err);}
               });

              // add comment
            console.log("removed snakes!");
            }else {console.log(err);}
    });
}

module.exports = seedDB;
