var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');

var productsRouter=require('./routes/products.router');
var defaultRouter=require('./routes/default.router');
var userRouter=require('./routes/user.router');
var middlewares=require('./utilities/middlewares');

var app=express();
app.listen(3000,function(){
    console.log("server is running on port 3000");
});

mongoose.connect("mongodb://localhost/myProductsDb", { useNewUrlParser: true ,useUnifiedTopology: true}, );
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(express.json());
app.use(bodyParser.json());

app.use('/',defaultRouter);
app.use('/api/users',userRouter);

app.use(middlewares.isAuthenticated);
app.use('/api/products',productsRouter);


