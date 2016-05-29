#!/bin/bash

# How To start tweetbot-growl at Startup of Mac.
# 1. Make it executable: chmod +x startup.cmd
# 2. Add this file in System Preferences > Accounts > Login items

# move to here
cd `dirname $0`

# start
node forever_run.js
