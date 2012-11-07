Supplimentary growl support for Tweetbot 
=========================================

The primary goal of this repo is to provide [growl](http://growl.info/) notifications for [Tweetbot](http://tapbots.com/tweetbot_mac/).
I really like Tweetbot, but the fact that there are no notifications for my feed requires that I have both Twitter and Tweetbot open at all times.

i tired to make it like growl notfications fro twitter with streaming, avatar and tap on notfication to view tweet.

![screenshot](http://i46.tinypic.com/14vu5x0.png)

## Installation

  Install [growlnotify](http://growl.info/extras.php#growlnotify).

  Clone this repo

    git@github.com:joshvermaire/node-tweetbot.git

  Go into the directory and start it

    cd node-tweetbot

  Setup a [new app](https://dev.twitter.com/apps/new) with Twitter.

  Add a `config.js` file to include your new keys:

    var config;
    config = {
      key: 'Your consumer key',
      secret: 'Your consumer secret',
      tokenKey: 'Your access token',
      tokenSecret: 'Your access token secret',
      username: 'yourtwitterusername'
    }
    module.exports = config;

  Install dependencies and start the app:

    npm install -d
    node app

  You're set.

## Todo

Make this into a command line app:

*   Ask for username (default in config file)
