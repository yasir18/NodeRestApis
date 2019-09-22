var products=[
    {id:1,brand:"apple",price:400},
    {id:2,brand:"samsung",price:300},
    {id:3,brand:"Xiaomi",price:200}
];

module.exports={
    getproducts: function(req,res){
        
        res.json(products);
    },
    getById:function(req,res){
        var id=+req.params.id;
        // + is used to convert string to int
        var product;
        for(var i=0;i<products.length;i++){
            if(products[i].id==id){
                product=products[i];
                break;
            }
        }
       
        if(product){
            res.status(200);
            res.json(product);
        }
        else{
            res.status(404);
            res.send("Not Found");
        }
    },
    save:function(req,res){
        console.log(req.body);
        products.push(req.body);
        res.json(products);
    }
};