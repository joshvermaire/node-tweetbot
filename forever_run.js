var restartIntervalMinute = 10;

var forever = require('forever-monitor');

var child = new (forever.Monitor)('app.js', {
	silent: true,
});

child.on('restart', function() {
    console.error('Forever restarting script for ' + child.times + ' time');
});

child.on('exit', function () {
	console.log('your-filename.js has exited after 3 restarts');
});

child.start();

setInterval(function() {
	child.restart();
}, restartIntervalMinute * 60 * 1000);
