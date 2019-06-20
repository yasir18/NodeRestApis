var obj={
    default:function(req,res){
        res.send("hello express");
    },
    health:function(req,res){
        var response={status:'up'};
        res.json(response);
    }

};
module.exports=obj;