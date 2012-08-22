var TIMEOUT, TWEET_INTERVAL, Twitter, config, count, feedCallback, firstTime, getFeed, growl, growlTimeout, growlTweet, recurringCallback, showFeed, sinceId, tweetList, tweetTimeout, twitter;

TWEET_INTERVAL = 10000;
TIMEOUT = 1000;
growl = require("growl");
Twitter = require("ntwitter");
config = require("./config");
sinceId = void 0;
count = 3;
tweetList = [];
growlTimeout = false;
tweetTimeout = false;

twitter = new Twitter({
  consumer_key: config.key,
  consumer_secret: config.secret,
  access_token_key: config.tokenKey,
  access_token_secret: config.tokenSecret
});

recurringCallback = function(err, data) {
  var i, lastTweet;
  if (err) {
    throw err;
  }
  i = data.length - 1;
  lastTweet = data[0];
  while (i >= 0) {
    tweetList.push(data[i]);
    i--;
  }
  if (lastTweet) {
    sinceId = lastTweet.id + 1;
  }
  tweetTimeout = setTimeout(getFeed, TWEET_INTERVAL);
  return showFeed();
};

feedCallback = firstTime = function(err, data) {
  var lastTweet;
  lastTweet = data[0];
  if (lastTweet) {
    sinceId = lastTweet.id + 1;
    count = 20;
    feedCallback = recurringCallback;
  }
  return tweetTimeout = setTimeout(getFeed, TWEET_INTERVAL);
};

getFeed = function() {
  var obj;
  obj = {
    count: count
  };
  if (sinceId) {
    obj.since_id = sinceId;
  }
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
  if (length) {
    tweet = tweetList.splice(length - 1, 1)[0];
    title = tweet.user.screen_name;
    growl(tweet.text, {
      title: title,
      image: "Tweetbot"
    });
    return growlTimeout = setTimeout(growlTweet, TIMEOUT);
  } else {
    return growlTimeout = false;
  }
};

twitter.verifyCredentials(function(err, data) {
  return getFeed();
});
