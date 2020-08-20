var http = require('http');
var fs = require('fs');



  let gdata = "";
  fs.readFile('iris.data', function (err, data) {
	   if (err) {
		  return console.error(err);
	   }
	   console.log("Asynchronous read: ", data.length);
	   gdata = data.toString();
	});
	
	//create a server object:
http.createServer(function (req, res) {
  //res.write('Hello World!'); //write a response to the client

  //console.log("gdata ", gdata);
  res.write(gdata.toString());
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080