html_form = "<form method='get' action='/Processing'>"; 
html_form += "<input type='text' id='input' name='input'>";
html_form += "<input type='radio' id='name' name='choice'>"; 
html_form += "<label for'name'> Company Name </label>"; 
html_form += "<input type='radio' id='ticker' name='choice'>"; 
html_form += "<label for'name'> Stock Ticker Symbol </label>"; 
html_form += "<input type='submit' value='Look Up'>"; 
html_form += "</form>"; 

var http = require('http'); 
var url = require('url'); 

http.createServer(function (req, res) { 
    res.writeHead(200, {'Content-Type': 'text/html'}); 

    var path = url.parse(req.url).pathname; 
    console.log(path); 

    if(path == "/")
        res.write(html_form); 
    else if (path == "/Home") 
        res.write(html_form); 
    else if(path == "/Processing")
        res.write("Processing..."); 
    res.end(); 
}).listen(8080); 
