// lynx.js

var express = require('express');
var bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.json());

app.use('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/api/example', function(req, res) {
	res.header("content-type", "application/json");
	res.send({
		command : "ImageExport",
		file : "[filename]",
		time : new Date().toISOString(),
		area : {
			lead : "-500",
			tail : "500",
			ceiling : "-800",
			floor : "800"
		}
	});
});

app.post('/api/image', function(req, res) {
	var cmd = req.body;

	setTimeout(function() {
		res.status = 200;
		res.send({
			command : cmd.command,
			status : "success",
			file : cmd.file
		});
	}, 1500);
});

app.listen(8080, function(err) {
	console.log((err ? 'failed' : 'listening'));
});