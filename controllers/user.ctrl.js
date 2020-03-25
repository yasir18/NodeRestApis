var User=require('../models/user.model');
var jwt=require('jsonwebtoken');
var bcrypt=require('bcrypt');
var config = require('../utilities/config');

module.exports={

    register:function(req,res){
        var encryptedPwd = bcrypt.hashSync(req.body.password, 2);
        req.body.password = encryptedPwd;
        var user=new User(req.body);
        user.save()
            .then(user=>{
                res.status(200);
                res.json(user);
            }).catch(err=>{
                if(err && err.errmsg && err.errmsg.indexOf("duplicate key error")> 1){
                    res.status(500);
                    res.json({error:"Username Alreay Exists"});
                }
                res.status(500);
                res.json(err);
            })
    },

    login:function(req,res){
        User.findOne({username:req.body.username})
            .exec()
            .then((user)=>{
                if(user){
                    var result=bcrypt.compareSync(req.body.password,user.password);
                    if(result){
                        let payload={username:req.body.username};
                        let token=jwt.sign(payload,config.secret_key,{expiresIn:config.expiry});
                        payload.token=token;
                        res.status(200);
                        res.json(payload);
                    }
                    else{
                        res.status(401);
                        res.send("wrong username or password");
                    }
                }
                else{
                    res.status(500);
                    res.json({error:"Username doesnot exists"});
                }
                
            }).catch(err=>{
                res.status(500);
                res.json({error:"Internal Server error"});
            })
    }
}