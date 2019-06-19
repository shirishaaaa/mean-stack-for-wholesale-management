var express = require('express');  
var bodyParser = require('body-parser'); 
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
var app = express();  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Connect to the db

MongoClient.connect("mongodb://127.0.0.1/mydb", function(err, db) {
 if(!err) {
    console.log("We are connected");

app.use(express.static('public')); 
app.use(bodyParser.json());


app.get('/', function (req, res) {  
   console.log("Got a GET request for the homepage");  
   res.send('<h1>hello</h1>');  
})


app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );    
})  




app.get('/insert.html', function (req, res) {
    res.sendFile( __dirname + "/" + "insert.html" );
})


app.post('/process_post', function (req, res) {
 
    console.log(req.body);
	res.setHeader('Content-Type', 'text/html');
   
    req.body.serverMessage = "NodeJS replying to angular"
        
console.log("Sent data are (POST): Supplier ID :"+req.body.sid+" Supplier Name="+req.body.sname);

var sid = req.body.sid;
var sname = req.body.sname;
var rid = req.body.rid;
var rname = req.body.rname;
	db.collection('s').insert({sid:sid,sname:sname,rid:rid,rname:rname});
    res.end(JSON.stringify(req.body));
   
});


app.get('/process_get', function (req, res) { 

  var news = req.query;
	var sid = req.query['sid'];
    var sname = req.query['sname'];
var rid = req.query['rid'];
    var rname = req.query['rname'];

	db.collection('s').insert({sid:sid,sname:sname,rid:rid,rname:rname});
    console.log("Sent data are (GET): Supplier ID :"+sid+" and Supplier name :"+sname);
  	res.end(JSON.stringify(news));
}) 

//--------------UPDATE------------------------------------------
app.get('/update.html', function (req, res) {
    res.sendFile( __dirname + "/" + "update.html" );
})

app.get("/update", function(req, res) {
	var s1=req.query.cname;
	
    
	db.collection('s', function (err, data) {
        data.update({"sname":s1},{$set:{"sname":"NEW"}},{multi:true},
            function(err, result){
				if (err) {
					console.log("Failed to update data.");
			} else {
				res.send(result);
				console.log("SUPPLIER-RETAILER SYSTEM Updated")
			}
        });
    });
})	
//--------------SEARCH------------------------------------------
app.get('/search.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "search.html" );    
})

app.get("/search", function(req, res) {
	
	var c2=req.query.c2;
    db.collection('s').find({sid: c2num}).toArray(function(err, docs) {
    if (err) {
      console.log(err.message+ "Failed to get data.");
    } 
      else {
	res.end(JSON.stringify(docs));
     // res.status(200).json(docs);
    }
  });
  });
  


app.get('/delete.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "delete.html" );    
})

app.get("/delete", function(req, res) {
		var c2num=req.query.sid;
	db.collection('s', function (err, data) {
        data.remove({"sid":c2num}, function(err, result){
				if (err) {
					console.log("Failed to remove data.");
			} else {
				res.send(result);
				console.log("SUPPLIER-RETAILER record Deleted")
			}
        });
    });
    
  });

app.get('/display.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "display.html" );    
})

app.get('/display', function (req, res) { 


db.collection('s').find().sort().toArray(
 		function(err , i){
        if (err) return console.log(err)
        res.render('disp.ejs',{wholesale: i})  
     })

}) 




app.get('/about.html', function (req, res) {  
   console.log("Got a GET request for /about");  
   res.sendFile( __dirname + "/" + "about.html" );    
})  
 
var server = app.listen(5000, function () {  
var host = server.address().address  
  var port = server.address().port  
console.log("Example app listening at http://%s:%s", host, port)  
})  
}
else
{   db.close();  }
  
});
