var Review=require('../models/review.model');
 module.exports = {
     save: function(req,res){
         let review = new Review(req.body);
         review.save()
                .then((review)=>{
                    res.status(200);
                    res.json(review);
                })
                .catch((error)=>{
                    res.status(500);
                    res.send("Internal Server error");
                })
     }
 }