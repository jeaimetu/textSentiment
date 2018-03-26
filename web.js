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
 'text': "As we understand it now, the data mining and analytics company, based out of London, gained access to data on as many as 50 million Facebook profiles thanks to generous data-sharing policies Facebook app developers enjoyed back in 2014. This data, which was sold to Cambridge Analytica against Facebook’s terms of service, reportedly informed the firm’s election ad targeting toolset used by the campaign of President Donald Trump and others. The fallout has been severe, with numerous lawsuits, governmental inquiries, a #DeleteFacebook user boycott campaign, and a sharp drop in share price that’s erased nearly $50 billion of the company’s market cap."
}, function(error, response) {
  if (error === null) {
    console.log(response);
  }
});

