var Review=require('../models/review.model');
var logger=require('../utilities/logger');

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
                    logger.error(error);
                    res.json({error:"Internal Server error"});
                })
     }
 }