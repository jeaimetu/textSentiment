// this is taken mostly from
// http://thecodinghumanist.com/blog/archives/2011/5/6/serving-static-files-from-node-js
var http = require('http');
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 8081; 
http.createServer(function (request, response) {
 
    console.log(request.url)
     
    var filePath = '.' + request.url;
    if (filePath.match('/[^.]*$')) filePath += '/'
    if (filePath.match('/$')) filePath += 'index.html'
         
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
    }
     
    fs.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
     
}).listen(port);
 
console.log('Server running at http://127.0.0.1:'+port+'/');

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: process.env.appid,
  application_key: process.env.appkey
});

textapi.sentiment({
  //'text': 'John is a very good football player!'
 'text': "여기 음식은 매우 맛있다.";
}, function(error, response) {
  if (error === null) {
    console.log(response);
  }
});

