module.exports={
    getproducts: function(req,res){
        var products=[
            {id:1,brand:"apple",price:400},
            {id:2,brand:"samsung",price:300},
            {id:3,brand:"Xiaomi",price:200}
        ];
        res.json(products);
    }
};