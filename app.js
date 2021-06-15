const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const ejs = require("ejs");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const axios = require("axios");
const key = enter your youtube api key
const url = "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&key="+key"&maxResults=50&pageToken=";

mongoose.connect('mongodb://localhost:27017/youtubeDB', {useNewUrlParser: true});

const TrendSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: String,
  channelId: String,
  publishedAt: String,
  description: String,
  thumbnail: String,
  channelTitle: String,
  viewcount: Number,
  likecount: Number,
  dislikecount: Number
  });
  
const Trend = mongoose.model("Trend", TrendSchema);



var returnArray = [];

function getData(nt){
  return axios.get(url + nt)
  .then(function(response){
    let output= response.data
    console.log(output.nextPageToken)
    console.log(output.items.length)
    for(i=0;i<output.items.length;i++){
      var newid = output.items[i]['id']
      var newtitle= output.items[i]['snippet']['title']
      var newchannelId= output.items[i]['snippet']['channelId']
      var newpublish=output.items[i]['snippet']['publishedAt']
      var newdescription=output.items[i]['snippet']['description']
      var newthumbnail=JSON.stringify(output.items[i]['snippet']['thumbnails'])
      var newChannelTitle=output.items[i]['snippet']['channelTitle']
      var newviewcount=output.items[i]['statistics']['viewCount']
      var newlikecount=output.items[i]['statistics']['likeCount']
      var newdislikecount=output.items[i]['statistics']['dislikeCount']
      var newInput = new Trend({ 
        id: newid,
        title: newtitle,
        channelId: newchannelId,
        publishedAt: newpublish,
        description: newdescription,
        thumbnail: newthumbnail,
        channelTitle: newChannelTitle,
        viewcount: newviewcount,
        likecount: newlikecount,
        dislikecount: newdislikecount
      }); // newinput ending
      newInput.save(function (err, newdata) {
        if (err) 
        return console.error(err);
        // console.log(newdata.title + " saved to Trends collection.");
      }) // save ending
    }  //for loop ending

    nt=response.data.nextPageToken

    return getData(nt);
  }
  ).catch(function(err) {
    return err;
  }
  )
}


getData("")



app.route("/")
.get(function(req,res){
  Trend.find(function(err, foundtrends){
  if(!err){
          res.render("index", {
          alltrends: foundtrends
        })
          }
  else{
      res.send(err);
      }
  });
})

app.listen(3001,function(){
    console.log("server started on port 3001");
 });
