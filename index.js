var express=require('express');
var bodyParser=require('body-parser');
var productsRouter=require('./routes/products.router');
var defaultRouter=require('./routes/default.router')

var app=express();
app.listen(3000,function(){
    console.log("server is running on port 3000");
});

app.use(express.json());
app.use(bodyParser.json());
//routing HttpGet
app.use('/',defaultRouter);
//app.get('/health',defaultRouter);

app.use('/products',productsRouter);
