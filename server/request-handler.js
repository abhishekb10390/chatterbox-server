/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require('url');
var fs = require('fs');
//var chatterBoxClient = http.createClient(3000, '///Users/student/Desktop/hrsf80-chatterbox-server/client/hrsf80-chatterbox-client-solution/client/index.html')
var messages = {};
messages.results = [{username:"Marc",text:"Welcome",roomname:"lobby"}];
var objectIdIndex = 1;

var requestHandler = function(request, response) {


  var urlPatt = /^\/classes\/messages*/
  if(!urlPatt.test(request.url)) {
    var headers = defaultCorsHeaders;
    response.writeHead(404, headers);
    response.end('404 - Incorrect path');
  }

  if(request.method === 'GET') {

    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'application/json';
    response.writeHead(200, headers);


    var theMessages = JSON.stringify(messages);
    response.end(theMessages);

  } else if(request.method === 'POST') {

    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'application/json';
    response.writeHead(201, headers);

    var chunk = '';
    request.on('data', function (d) {
      chunk += d;
    });

    request.on('end', function () {
      chunk = JSON.parse(chunk);

      chunk.objectId = ++objectIdIndex;
      messages.results.push(chunk);
      var theMessages = JSON.stringify(messages);
      response.end(theMessages);

    });

  } else if (request.method === 'OPTIONS') {
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'application/json';
    response.writeHead(202, headers);
    response.end(null);

  } else {
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'application/json';
    response.writeHead(404, headers);
    response.end("Not found");
  }

// var filepath = '' + request.url;
// fs.readFile('./Index.html', function(err, html){
//   if (err) {
//     throw err;
//   } else {
//      headers['Content-Type'] = 'text/html';
//      response.writeHead(202, headers);
//      response.write(html);
//      response.end();
//   }
// })

    //request.end('post received');

    // response.on('end', function(){
    //   var statusCode = 201;
    //   var headers = defaultCorsHeaders;
    //   headers['Content-Type'] = 'application/json';
    //   response.writeHead(statusCode, headers);
    //   response.end('success');
    // });




//   var headers = defaultCorsHeaders;
//   headers['Content-Type'] = 'application/json';
//   statusCode = 200;
//     if (request.method === responseMethod[request.method]) {
//       responseMethod[request.method](request, response, headers);
//     }

// var responseMethod = {
//   GET: function(request, response, headers) {
//     response.writeHead(200, headers);
//     var theMessages = JSON.stringify(messages);
//     response.end(theMessages);
//   },
//   POST: function(request, response, headers) {
//     var body = '';
//     response.writeHead(201, headers);
//     response.on('data', function(data){
//       body += data;
//       messages.results.push(JSON.parse(body))
//     });
//     response.end();
//   }
// }

// {GET: function()}

// if (request.method === GEt) {
//   obj.GET()
// }

  // }

  // The outgoing status.
  //var statusCode = 200;

  // See the note below about CORS headers.
  //var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  //headers['Content-Type'] = 'application/json';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  //response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  //response.end(JSON.stringify(messages));
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.

};

module.exports.requestHandler = requestHandler;
