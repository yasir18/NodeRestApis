var bunyan=require('bunyan');
var fs=require('fs');

var file=fs.createWriteStream('./logs/application-log.log',{flags:'a'});
var logger=bunyan.createLogger(
    {   name:'app',
        streams: [{
            level:'info',
            stream:file
        }]
        });
module.exports=logger;