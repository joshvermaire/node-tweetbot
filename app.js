var Twitter, config, growl, growlTweet,streamTwitter,twitter;
var http = require('http')
  , fs = require('fs')

growl = require("growl");
Twitter = require("ntwitter");
config = require("./config");
growlTimeout = false;

twitter = new Twitter({
  consumer_key: config.key,
  consumer_secret: config.secret,
  access_token_key: config.tokenKey,
  access_token_secret: config.tokenSecret
});



growlTweet = function(tweet,image) {
  var length, title;
  //if coming tweet was retweet
  if(tweet.retweeted_status)
    tweet = tweet.retweeted_status;

  title = tweet.user.name;
  growl(tweet.text, {
        title: title,
        image: image,
        url:"tweetbot://"+tweet.user.screen_name+"/status/"+tweet.id_str
      });   
};

streamTwitter = function()
{
  twitter.stream('user', function(stream) {
    stream.on('data', function (tweet) {

      if(tweet.user)
      {
        if(tweet.retweeted_status)
            tweet = tweet.retweeted_status;

        getAvatar(tweet);
      }

    });
    stream.on('end', function (response) {
      // Handle a disconnection
    });
    stream.on('destroy', function (response) {
      // Handle a 'silent' disconnection from Twitter, no end/error event fired
    });
  });
}



getAvatar = function (tweet)
{
  var crypto = require('crypto');
  var hash = crypto.createHash('md5').update(tweet.user.profile_image_url).digest("hex");
  var filename= "/Applications/tweetbot/temp/"+hash+".png";

  fs.exists(filename, function(exists) {
    if (exists) {
      //avatar exist .. go growl
      growlTweet(tweet,filename);

    } else {
      //avatar exist .. go growl

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


twitter.verifyCredentials(function(err, data) {
  streamTwitter();
});
console.log('wait for tweets .. ')

