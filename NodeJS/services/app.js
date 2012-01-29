var httpApp = require("http"),
    urlApp = require("url");


var options = {
    url : 'http://10.18.8.31:1911',
    host : 'localhost',
    port : 8080
}


function server(req, resp) {
    proxyGetResponse(options.url, function(statuscode, headers, body) {
        var responseBody = body;
        resp.writeHead(statuscode, {
            "Content-type" : "text/plain"
        });
        resp.write(responseBody,encoding='utf8');
        resp.end();
    });

}

function getUrlHash(url, name) {
    return urlApp.parse(url, true).query.name;
}

function clientServer(port, host) {
    return httpApp.createClient(port, host);
}

function proxyGetResponse(url, callback) {
    var target = urlApp.parse(url);
    var config = {
        host:target.hostname,
        port:target.port || 80,
        path:target.pathname,
        auth:target.auth
    }

    console.log(config)

    var CLIENTSERVER = clientServer(config.port, config.host);

    CLIENTSERVER.on('error', function(err) {
        console.log("CLIENTSERVER ERROR", url, err);
    });

    var header = {'host': config.host};
    if (config.auth) {
        header["Authorization"] = "Basic " + new Buffer(config.auth).toString('base64');
    }


    var request = CLIENTSERVER.request('GET', config.path, header);
    request.on('response', function(response) {
        var data = '';
        response.on('data', function(o) {
            data += o;
        });
        response.on('end', function() {
            callback(response.statusCode, response.headers, data);
        })
    });
    request.end();

}

String.prototype.format = function(args) {
    if (arguments.length == 0) return null;
    var args = Array.prototype.slice.call(arguments, 0);
    return this.replace(/\{(\d+)\}/g, function(m, i) {
        return args[i];
    });
};

var SERVER = httpApp.createServer(server).listen(options.port, options.host);
console.log("server is running ..... ")




