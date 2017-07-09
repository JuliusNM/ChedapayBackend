var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Recipient = require('./models/recipient');

//connect to mongoose
mongoose.connect('mongodb://localhost/chedapay');

var db = mongoose.connection;

app.get('/', function(req, res){
	res.send('hello world!');
});

app.get('/api/recipients', function(req, res){
	Recipient.getRecipients(function(err, recipients){
		if (err){
			throw err;
		}
		res.json(recipients);

	});
});

app.listen(3000);
console.log('Running on port 3000...');