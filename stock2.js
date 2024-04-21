// html form setup
html_form = "<form method='get' action='/Processing'>"; 
html_form += "<input type='text' id='input' name='input'>";
html_form += "<input type='radio' id='name' name='choice' value='name'>"; 
html_form += "<label for'name'> Company Name </label>"; 
html_form += "<input type='radio' id='ticker' name='choice' value='ticker'>"; 
html_form += "<label for'name'> Stock Ticker Symbol </label>"; 
html_form += "<input type='submit' value='Look Up'>"; 
html_form += "</form>"; 

// Required Modules and Port Setup
var http = require('http'); 
var url = require('url'); 
var port = process.env.PORT || 3000;

// mongo setup details 
const MongoClient = require('mongodb').MongoClient;
const connStr = "mongodb+srv://lilycomeau:DOMINOSdc5is@cluster1.4gz6pjg.mongodb.net/?retryWrites=true&w=majority&appName=cluster1"; 
client =  new MongoClient(connStr); 

// server set up and everything to happen on the page 
http.createServer(function (req, res) { 
    res.writeHead(200, {'Content-Type': 'text/html'}); 

    var path = url.parse(req.url).pathname; 
    var query = url.parse(req.url, true).query; 

    if(path == "/")
        res.write(html_form); 
    else if (path == "/Home") 
        res.write(html_form); 
    else if(path == "/Processing") { 
        res.write("Processing..."); 
        findStock(query); 
    }
    res.end(); 
}).listen(port); 

// helper functions   
async function findStock(query) { 
    // choose the correct type of data search 
    value = query['input']; 
    if(query['choice'] == 'name') { 
        theQuery = {Name: value}; 
    }
    else if (query['choice'] == 'ticker') { 
        theQuery = {Stock_Ticker: value}; 
    }

    // connect to the database 
    try {
        await client.connect(); 
        var dbStock = client.db('Stock'); 
        var colCompanies = dbStock.collection('PublicCompanies');

        const searchResult = colCompanies.find(theQuery); 
        if((await searchResult.count()) == 0) { 
            console.log("No documents found."); 
        }
        else { 
            await searchResult.forEach(function(item) { 
                console.log(item.Name); 
                console.log(item.Stock_Ticker);
                console.log(item.Price);  
                console.log("\n"); 
            }); 
        }
    }
    catch(err) { 
        console.log(err); 
    }
    finally { 
        client.close(); 
    }
    
}
