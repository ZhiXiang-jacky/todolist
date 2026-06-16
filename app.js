// var http = require("http");
// http.createServer(function(request,response){
//     response.writeHead(200,{"content-type":"text/plain"});
//     response.write("hello!!");
//     response.end();
// }).listen(8080);

var http = require("http");
http.createServer(function(request,response){
    console.log(request)
    response.writeHead(200,{"Content-type":"text/plain"})
    response.write("Hello~")
    response.end()
}).listen(8080);