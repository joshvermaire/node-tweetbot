Supplimentary growl support for Tweetbot Alpha
==============================================

The primary goal of this repo is to provide [growl](http://growl.info/) notifications for [Tweetbot](http://tapbots.com/tweetbot_mac/). I really like Tweetbot, but the fact that there are no notifications for my feed requires that I have both Twitter and Tweetbot open at all times.

While I understand that Tweetbot is in an alpha stage, this repo will be maintained until Tweetbot gets feed notifications in place.

## Installation

  Install [growlnotify](http://growl.info/extras.php#growlnotify).

  Clone this repo

    git@github.com:joshvermaire/node-tweetbot.git

  Go into the directory and start it

    cd node-tweetbot

  Setup a [new app](https://dev.twitter.com/apps/new) with Twitter.

  Edit the config.js file to include your new keys:

    config = {
      key: 'Your consumer key',
      secret: 'Your consumer secret',
      tokenKey: 'Your access token',
      tokenSecret: 'Your access token secret',
      username: 'yourtwitterusername'
    }

  Install dependencies and start the app:

    npm install -d
    node app

  You're set.

## Todo

Make this into a command line app.

Items for consideration:
Time between checking for tweets (default 10s)
Time between showing growl notifications (default 1s)
Ask for username (default in config file)
Support for Mountain Lion Notification Center

