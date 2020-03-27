var multer = require('multer');

var diskStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/");
    },
    filename: function(req,file,cb){
        var filename= Date.now() + "-" + file.originalname;
        req.image = filename;
        cb(null,filename)
    }
})
var upload = multer({ storage: diskStorage });

module.exports = upload;