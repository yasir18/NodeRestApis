var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var morgan=require('morgan');
var fs=require('fs');

var productsRouter=require('./routes/products.router');
var defaultRouter=require('./routes/default.router');
var userRouter=require('./routes/user.router');
var middlewares=require('./utilities/middlewares');
var config=require('./utilities/config');

var app=express();
var port=process.env.PORT || 3000;
app.listen(port,function(){
    console.log("server is running on port 3000");
});

mongoose.connect(config.connectionString, { useNewUrlParser: true ,useUnifiedTopology: true}, );
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


var file=fs.createWriteStream(__dirname+'/logs/request-logger.log',{flags:'a'});
app.use(express.json());
app.use(bodyParser.json());

//app.use(morgan('dev')); 
//app.use(morgan('combined',{stream:file})); --> For request logging
app.use('/',defaultRouter);
app.use('/api/users',userRouter);

//app.use(middlewares.isAuthenticated);
app.use('/api/products',productsRouter);


