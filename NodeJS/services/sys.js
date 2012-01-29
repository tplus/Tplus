var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    fs = require('fs');

var server = http.createServer(function(req, resp) {
    req.setEncoding('utf8');
    resp.writeHeader(200, {"Content-Type": "text/html; charset=UTF-8"});
    var getUrl = url.parse(req.url, true).query.geturl;


    var requestMain = server.request("GET", getUrl);

    requestMain.addListener("response", function(response) {
        var body = "";
        response.addListener("data", function(data) {
            body += data;
        });

        response.addListener("end", function() {
            resp.write("Hello World! <br /> url = " + body);
            resp.end();
        });
    });

    requestMain.close();


});

server.listen(9999);

sys.puts("Server running at http://localhost:9999/");



var express = require('express');
var url = require("url");
var application = express.createServer();

application.get('/url:?', function(request, response) {
    response.send('Hello Express!!');
});

application.listen(2455);
