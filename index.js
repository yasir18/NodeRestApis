var express=require('express');
var productsCtrl=require('./controllers/products.ctrl');
var defaultCtrl=require('./controllers/default.ctrl');
var app=express();
app.listen(3000,function(){
    console.log("server is running on port 3000");
});


//routing HttpGet
app.get('/',defaultCtrl.default);

app.get('/health',defaultCtrl.health);

app.get('/products',productsCtrl.getproducts);
