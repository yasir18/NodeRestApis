var Product=require("../models/product.model");



module.exports={
    getproducts: function(req,res){

        var pageSize = +req.params.pageSize || 5;
        var pageIndex = +req.params.pageIndex || 0;

        Product.count(function(err,cnt){
            count=cnt;

            var query=Product.find({}, { __v: 0 })
                             .skip(pageIndex * pageSize)
                             .limit(pageSize)
                             .sort("-lastUpdated");
             
            query.exec(function(err,products){
                if(!err){
                    
                    var response={
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
                    
                    res.status(500);
                    res.send("Internal server error");
                }            
            });                 

            
        });


             
    },

    getById:function(req,res){
        var id=req.params.id;
        //product.findById(id,{},callback); or 
        Product.findOne({'_id':id},{'__v':0},function(err,product){
                if(!err){
                   if(product){
                        res.status(200);
                        res.json(product);
                   }
                   else{
                       res.status(404);
                       res.send("Not found");
                   }
                }
                else{
                    res.status(500);
                    res.send("Internal server error");
                     
                }
        });      
    },

    save:function(req,res){
        var product=new Product(req.body);
        product.save(function(err,product){
            if(!err){
                res.status(200);
                res.json(product);
            }
            else{
                res.status(500);
                res.send(err);
            }            
        });

    },

    delete:function(req,res){
        var id=req.params.id;
        Product.findByIdAndRemove(id,function(err){
            if(!err){
                res.status(200);
                res.send("Deleted");
            }
            else{
                res.status(500);
                res.send(err);
            }
        });
    },

    update:function(req,res){
        var id=req.params.id;

        Product.findByIdAndUpdate(id,{ $set:{ model:req.body.model, brand:req.body.brand,
                                              price:req.body.price, inStock:req.body.inStock 
                                             } },
                                          function(err,product){
                                            if(!err){
                                                res.status(200);
                                                res.json(product);
                                            }
                                            else{
                                                res.status(500);
                                                res.send(err);
                                            }
                                         });
    }
    
};


