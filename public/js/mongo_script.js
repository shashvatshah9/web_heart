var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/idea_lab';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  	if(!err){
  		console.log("Connected successfully to server");
  	}
  	else{
  		console.log(err);
  	}
});
