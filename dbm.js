var mongo = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/videodb"
var status_url = "mongodb://localhost:27017/stutus"

mongo.connect(url, function(err, db){
  if(err) throw err;
  console.log("db created")
  var myVid = [
  { name: "Classification.mp4"},
  { name: "CostFunction.mp4"},
  { name: "GradientDescent.mp4"}
  ]
  db.createCollection("videos", function(err, res){
    if(err) throw err;
  })
  db.collection("videos").insertMany(myVid, function(err, res){
  	if(err) throw err;
  	console.log('data inserted ' + res.insertedCount)
  })
  db.close()
})

