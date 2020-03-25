var Product=require("../models/product.model");
var Review=require("../models/review.model");

module.exports={
    getproducts: function(req,res){
        var pageSize = +req.params.pageSize || 5;
        var pageIndex = +req.params.pageIndex || 0;

        Product.countDocuments()
            .then((count)=>{
                Product.find({},{'__v':0})
                        .skip(pageIndex*pageSize)
                        .limit(pageSize)
                        .sort("-lastUpdated")
                        .exec()
                        .then((products)=>{
                            if(products){
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
            res.send("Internal server error");
        })
            
    },

    getById : function(req,res){             
        let id=req.params.id;
        Product.findOne({'_id':id},{'__v':0})
                .exec()
                .then((product)=>{
                    if(product){
                        console.log(product);
                        Review.find({productId:id}) 
                              .exec() 
                              .then((review)=>{
                                var jsonProduct = product.toJSON();
                                jsonProduct.review=review;
                                res.status(200);
                                res.json(jsonProduct);
                              })
                    }
                    else{
                        res.status(404);
                        res.send("Not Found");
                    }                   
                }).catch((error)=>{
                    res.status(500);
                    res.send("Internal server error");
                });
    },

    save:function(req,res){       
        let product= new Product(req.body);
        product.save(product)
                .then((product)=>{
                    res.status(200);
                    res.json(product);
                }).catch((error)=>{
                    res.status(500)
                    res.send("Internal Server Error");
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
                    res.send(err);
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
                                    console.log(product);
                               }).catch(error => {
                                    res.status(500);
                                    res.send(err);
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