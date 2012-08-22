var TIMEOUT, TWEET_INTERVAL, Twitter, config, count, feedCallback, firstTime, getFeed, growl, growlTimeout, growlTweet, recurringCallback, showFeed, sinceId, tweetList, twitter, lastShownId, updateTweetList;

TWEET_INTERVAL = 10000;
TIMEOUT = 1000;
growl = require("growl");
Twitter = require("ntwitter");
config = require("./config");
count = 1;
tweetList = [];
growlTimeout = false;

twitter = new Twitter({
  consumer_key: config.key,
  consumer_secret: config.secret,
  access_token_key: config.tokenKey,
  access_token_secret: config.tokenSecret
});

updateTweetList = function(tweets) {
  var i;
  i = tweets.length - 1;
  while (i >= 0) {
    tweetList.push(tweets[i]);
    i--;
  }
}

recurringCallback = function(err, data) {
  var lastTweet;
  if (err) {
    throw err;
  }
  lastTweet = data[0];
  if (lastTweet) {
    sinceId = lastTweet.id;
  }
  updateTweetList(data);
  showFeed();
  return setTimeout(getFeed, TWEET_INTERVAL);
};

feedCallback = firstTime = function(err, data) {
  var lastTweet;
  lastTweet = data[0];
  if (lastTweet) {
    sinceId = lastTweet.id;
    count = 20;
    feedCallback = recurringCallback;
  }
  return setTimeout(getFeed, TWEET_INTERVAL);
};

getFeed = function() {
  var obj;
  obj = {
    count: count
  };
  if (sinceId) {
    obj.since_id = sinceId + 1;
  }
  console.log(sinceId);
  return twitter.getHomeTimeline(obj, feedCallback);
};

showFeed = function() {
  if (!growlTimeout) {
    return growlTweet();
  }
};

growlTweet = function() {
  var length, title, tweet;
  length = tweetList.length;
  console.log(length);
  if (length) {
    tweet = tweetList.splice(length - 1, 1)[0];
    if (tweet.id > lastShownId) {
      lastShownId = tweet.id;
      title = tweet.user.screen_name;
      growl(tweet.text, {
        title: title,
        image: "Tweetbot"
      });
      growlTimeout = setTimeout(growlTweet, TIMEOUT);
    } else {
      growlTweet();
    }
  } else {
    return growlTimeout = false;
  }
};

twitter.verifyCredentials(function(err, data) {
  return getFeed();
});
