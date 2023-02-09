var http = require("http");

// The createServer function receives a callback function. This is the function that will be called when a network request comes in.
// Whenever someone hits our website, Our callback function will receive request and response objects.
http
  .createServer(function (request, response) {
    response.writeHead(200);
    response.write("<h1>Hello Node!!!!</h1>\n");
    response.end(); // return the response to the user
  })
  .listen(3000);
console.log("Server running at http://localhost:3000");
