var mongo = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/videodb"

mongo.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("videos").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});