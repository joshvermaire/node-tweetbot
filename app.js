var Twitter, config, growl, growlTweet, streamTwitter, twitter;
var http = require('http')
  , fs = require('fs')

growl = require("growl");
config = require("./config");
growlTimeout = false;
Twitter = require('twitter');
 
twitter = new Twitter({
  consumer_key: config.key,
  consumer_secret: config.secret,
  access_token_key: config.tokenKey,
  access_token_secret: config.tokenSecret
});
 
console.log("start");

growlTweet = function(tweet,image) {
  var length, title;
  //if coming tweet was retweet
  if(tweet.retweeted_status)
    tweet = tweet.retweeted_status;
    title = tweet.user.name;
    growl(tweet.text, {
      title: title,
      image: image,
      url: "tweetbot://"+tweet.user.screen_name+"/status/"+tweet.id_str
    });   
};

streamTwitter = function()
{
  var stream = twitter.stream('user');
  stream.on('data', function(tweet) {
    if(tweet.user) {
      console.log(tweet.text);
      if(tweet.retweeted_status)
        tweet = tweet.retweeted_status;
        getAvatar(tweet);
      }
  });
}



getAvatar = function (tweet)
{
  var crypto = require('crypto');
  var hash = crypto.createHash('md5').update(tweet.user.profile_image_url).digest("hex");
  var filename= __dirname+"/temp/"+hash+".png";

  fs.exists(filename, function(exists) {
    if (exists) {
      //avatar exist .. go growl
      growlTweet(tweet,filename);

    } else {
      //avatar doesn't exist .. download then Growl

      var request = http.get(tweet.user.profile_image_url, function(res){
          var imagedata = ''
          res.setEncoding('binary');

          res.on('data', function(chunk){
              imagedata += chunk
          })
          res.on('end', function(){
              fs.writeFile(filename, imagedata, 'binary', function(err){
                  if (err) throw err
                   growlTweet(tweet,filename);
              })
          })

      })
    }
  });  
}

streamTwitter();
console.log('wait for tweets .. ');

