
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
//const router = express.Router()

var mongo = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/videodb"
var video_list, eeg_data, pupil_data, heart_data

mongo.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("videos").find({}).toArray(function(err, result) {
          if (err) throw err;
          video_list = result
          db.close();
        });
});

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/video_player.html')) 
  
})

/*
app.get('/views/:whichView',function(req, res){
  res.sendFile(path.join(__dirname + '/public/views/'+ res.params.whichView))
  console.log("Opening path "+__dirname+'/public/views/'+res.params.whichView)
})
*/

app.get('/json/', function(req, res){

      
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(video_list, null, 4)); 
})
 

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})


app.get('/images/:image', function(req, res){
   res.sendFile(path.join(__dirname+ 'public/assets'+req.params.image))
})
  

app.get('/video/:whichVideo', function(req, res) {

const path = 'public/assets/'+ req.params.whichVideo
console.log(path)
const stat = fs.statSync(path)
const fileSize = stat.size
const range = req.headers.range

if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]? parseInt(parts[1], 10): fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    //make an open ended connection
    res.writeHead(206, head)
    //write the content to the bytestream
    file.pipe(res)
} else { // if no range is available, then send the whole video
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})


app.get('/Eeg/', function (req, res) {
  mongo.connect(url, function(err, db){
      if (err) throw err;
      // frequency 512 Hz
      db.collection("eeg_data").find().sort({$natural:-1}).limit(1).toArray(function(err, result) {
      if (err) throw err;
      eeg_data = result
      });
     
    db.close()
  });
  //console.log(eeg_data)
  res.header("Content-Type", 'application/json');
  res.send(JSON.stringify(eeg_data));

});

app.get('/eye/', function (req, res) {
  mongo.connect(url, function(err, db){
      if (err) throw err;
      // frequency 512 Hz
      db.collection("pupil_track").find().sort({$natural: -1}).limit(1).toArray(function(err, result){
        if(err) throw err;
        pupil_data = result
      })
      
    db.close()
  });
  //console.log(pupil_data)

  res.header("Content-Type", 'application/json');
  res.send(JSON.stringify(pupil_data));

});

app.get('/heart/', function (req, res) {
  mongo.connect(url, function(err, db){
      if (err) throw err;
      // frequency 512 Hz
     
      db.collection("heart_data").find().sort({$natural: -1}).limit(1).toArray(function(err, result){
         if(err) throw err;
         heart_data = result 
      })
    db.close()
  });
  //console.log(heart_data)
  res.header("Content-Type", 'application/json');
  res.send(JSON.stringify(heart_data));

});

