

var http=require('http');


function handle(req,res){
    switch(req.url){
        case '/':
            res.write('Index page');
            res.end();
            break;
        case '/about':
            res.write('About page');
            res.end();
            break;
        case '/contact':
            res.write('Contact page');
            res.end();
            break;
        default:
            res.write('Home Page');
            break;
            res.end();
    }
    
}

var server=http.createServer(handle);
server.listen(3000);
console.log("server running on port 3000");