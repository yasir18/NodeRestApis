var Product=require("../models/product.model");
var Review=require("../models/review.model");
var logger=require('../utilities/logger');

module.exports={
    getproducts: function(req,res){
        var pageSize = +req.params.pageSize || 5;
        var pageIndex = +req.params.pageIndex || 0;
        var sortBy = req.query.sortBy || "lastUpdated";
        var sortDirection = req.query.sortDirection ? req.query.sortDirection.toLowerCase() === "asc"? "":"-": "-";

        Product.countDocuments()
            .then((count)=>{
                Product.find({},{'__v':0})
                        .skip(pageIndex*pageSize)
                        .limit(pageSize)
                        .sort(sortDirection + sortBy)
                        .exec()
                        .then((products)=>{
                            if(products){
                                for (var i = 0; i < products.length; i++) {
                                    
                                    if (products[i].image)
                                        products[i].image = req.protocol + "://" + req.get('host') + "/" + products[i].image;
                                }
                                let response={
                                    metadata:{
                                        'total Count':count,
                                        'pages': Math.ceil(count/pageSize)
                                    },
                                    data:products
                                }
                                res.status(200);
                                res.json(response);
                            }
                            else{
                                res.status(200);
                                res.json(response);
                            }
        })})
        .catch((error)=>{
            res.status(500);
            logger.error(error);
            res.send("Internal server error");
        })
            
    },

    getById : function(req,res){             
        let id=req.params.id;
        Product.findOne({'_id':id},{'__v':0})
                .exec()
                .then((product)=>{
                    if(product){
                        product.image=req.protocol + "://" + req.get('host') + "/" + product.image;
                        Review.find({productId:id}) 
                              .exec() 
                              .then((reviews)=>{
                                var jsonProduct = product.toJSON();
                                jsonProduct.reviews=reviews;
                                Review.aggregate(
                                    [
                                        {$match : {productId:id}},
                                        {$group : {_id:'$productId', averageRatings:{$avg:'$rating'} }}
                                    ]
                                ).then((result)=>{
                                    if(result && result.length>0){
                                        jsonProduct.averageRatings=result[0].averageRatings.toPrecision(2);
                                    }
                                    res.status(200);
                                    res.json(jsonProduct);
                                }).catch(err=>{
                                    res.status(500);
                                    logger.error(err);
                                    res.json({error:"Internal Server error"});
                                })
                              })
                    }
                    else{
                        res.status(404);
                        res.send("Not Found");
                    }                   
                }).catch((error)=>{
                    res.status(500);
                    logger.error(error);
                    res.json({error:"Internal Server error"});
                });
    },

    save:function(req,res){
        req.body.image=req.image;  //getting image name from request, which was set in uploader.js     
        let product= new Product(req.body);
        product.save(product)
                .then((product)=>{
                    res.status(200);
                    res.json(product);
                }).catch((error)=>{
                    res.status(500);
                    logger.error(error);
                    res.json({error:"Internal Server error"});
                })
    },

    delete:function(req,res){
        let id=req.params.id;
        Product.findByIdAndDelete(id)
                .then(()=>{
                    res.status(200);
                    res.send("Deleted");
                })
                .catch((error)=>{
                    res.status(500);
                    logger.error(error);
                    res.json({error:"Internal Server error"});
                })
    },

    update:function(req,res){
        let id = req.params.id;
        Product.findByIdAndUpdate(id,{ $set:{ model:req.body.model, brand:req.body.brand,
                                    price:req.body.price, inStock:req.body.inStock 
                                } })
                               .then((product)=>{
                                    res.status(200);
                                    res.json(product);
                               }).catch(error => {
                                    res.status(500);
                                    logger.error(error);
                                    res.json({error:"Internal Server error"});
                               })     
    }

    
};


//using CallBacks

// Product.count(function(err,cnt){
        //     count=cnt;

        //     var query=Product.find({}, { __v: 0 })
        //                      .skip(pageIndex * pageSize)
        //                      .limit(pageSize)
        //                      .sort("-lastUpdated");
             
        //     query.exec(function(err,products){
        //         if(!err){
                    
        //             var response={
        //                 metadata:{
        //                     'total Count':count,
        //                     'pages': Math.ceil(count/pageSize)
        //                 },
        //                 data:products
        //             }
        //             res.status(200);
        //             res.json(response);

        //         }
        //         else{
                    
        //             res.status(500);
        //             res.send("Internal server error");
        //         }            
        //     });                 

            
        // });

 // var id=req.params.id;
        // //product.findById(id,{},callback); or 
        // Product.findOne({'_id':id},{'__v':0},function(err,product){
        //         if(!err){
        //            if(product){
        //                 res.status(200);
        //                 res.json(product);
        //            }
        //            else{
        //                res.status(404);
        //                res.send("Not found");
        //            }
        //         }
        //         else{
        //             res.status(500);
        //             res.send("Internal server error");
                     
        //         }
        // });

// var product=new Product(req.body);
        // product.save(function(err,product){
        //     if(!err){
        //         res.status(200);
        //         res.json(product);
        //     }
        //     else{
        //         res.status(500);
        //         res.send(err);
        //     }            
        // });
        
// var id=req.params.id;
        // Product.findByIdAndRemove(id,function(err){
        //     if(!err){
        //         res.status(200);
        //         res.send("Deleted");
        //     }
        //     else{
        //         res.status(500);
        //         res.send(err);
        //     }
        // });    

// var id=req.params.id;

        // Product.findByIdAndUpdate(id,{ $set:{ model:req.body.model, brand:req.body.brand,
        //                                       price:req.body.price, inStock:req.body.inStock 
        //                                      } },
        //                                   function(err,product){
        //                                     if(!err){
        //                                         res.status(200);
        //                                         res.json(product);
        //                                         console.log(product);
        //                                     }
        //                                     else{
        //                                         res.status(500);
        //                                         res.send(err);
        //                                     }
        //                                  });