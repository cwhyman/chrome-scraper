var http = require('http');

http.createServer(function(request, response) {
  try 
  {
    response.writeHead(200, 
	{"Content-Type": "text/plain",
	 "Access-Control-Allow-Origin": "chrome-extension://legghnkhmomhoefmbpnnakkpnnkmlelh",
	 "Access-Control-Allow-Origin": "chrome-extension://oagjbcifdmcaoiaamngnblfbbcaijhjd",
	 "Access-Control-Allow-Origin": "chrome-extension://legghnkhmomhoefmbpnnakkpnnkmlelh",
	 "Access-Control-Allow-Origin": "chrome-extension://oagjbcifdmcaoiaamngnblfbbcaijhjd",
	 });
  
    var url = require('url').parse(request.url, true);
    var mode = url.query.mode;
    var action = require('./project.js');

    if (mode === 'parser')
    {
      response.write('return ' + action.get_parser.toString());
      response.end();
    } 
    else if (mode === 'data')
    {
      var query = url.query;
      var fn = query.fn;

      var args = [];
      args[0] = request;
      args[1] = response;
  
      var numArgs = query.l;
      for (var i = 0; i < numArgs; i++) 
      {
  			args[i + 2] = query["a" + i];
      }

      (action[fn]).apply(null, args);
			args = null;
    }
    else 
    {
      response.end();
    }
  } 
  catch (e)
  {
    try 
    {
			console.log("ERROR: " + e);
		  console.log(e.stack);
      response.write("ERROR: " + e);
      response.end(); 
    } catch (f) { }
  }
}).listen(80);

