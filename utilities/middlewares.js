var jwt= require('jsonwebtoken');
var config=require('./config');
module.exports = {
    isAuthenticated : function(req,res,next){
        jwt.verify(req.headers["authorization"], config.secret_key, function (err, data) {
            if (data) next();
            else {
                res.status(401);
                res.send("Unathorized");
            }
        });
    }
}