var express=require('express');
var app=express();
app.listen(3000,function(){
    console.log("server is running on port 3000");
});


//routing HttpGet
app.get('/',function(req,res){
    res.send("hello express");
});

app.get('/health',function(req,res){
    var response={status:'up'};
    res.json(response);
});

