

// var http=require('http');
// var fs=require('fs');

// function handle(req,res){
//     switch(req.url){
//         case '/':
//             fs.readFile("index.html",function(err,contents){
//                 res.write(contents);
//                 res.end();
//             });          
//             break;
//         case '/about':
//             res.write('About page');
//             res.end();
//             break;
//         case '/contact':
//             res.write('Contact page');
//             res.end();
//             break;
//         case '/products':
//                 var products=[
//                     {id:1,brand:"apple",price:400},
//                     {id:2,brand:"samsung",price:300},
//                     {id:3,brand:"Xiaomi",price:200}
//                 ];
//                 //write function will take only string
//                 //so convert json to string
//                 res.write(JSON.stringify(products));
//                 res.end();
//                 break;    
//         default:
//             res.write('Home Page');
//             break;
//             res.end();
//     }
    
// }

// var server=http.createServer(handle);
// server.listen(3000);
// console.log("server running on port 3000");



var calculator=require('./math');
console.log(calculator.display2());
console.log(calculator.myProperty2);