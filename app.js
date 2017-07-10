var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Recipient = require('./models/recipient');
User = require('./models/user');
Card = require('./models/card');
Bank = require('./models/bank');
Account = require('./models/account');


//connect to mongoose
mongoose.connect('mongodb://localhost/chedapay');

var db = mongoose.connection;

app.get('/', function(req, res){
	res.send('hello world!');
});
// Get Recipients
app.get('/api/recipients', function(req, res){
	Recipient.getRecipients(function(err, recipients){
		if (err){
			throw err;
		}
		res.json(recipients);

	});
});

// Post Recipient
app.post('/api/recipients', function(req, res){
	var recipient = req.body;
	Recipient.addRecipient(recipient, function(err, recipient){
		if (err){
			throw err;
		}
		res.json(recipient);

	});
});
// Get Users
app.get('/api/users', function(req, res){
	User.getUsers(function(err, users){
		if (err){
			throw err;
		}
		res.json(users);

	});
});

// Post User
app.post('/api/users', function(req, res){
	var user = req.body;
	User.addUser(user, function(err, user){
		if (err){
			throw err;
		}
		res.json(user);

	});
});

// Get Cards
app.get('/api/cards', function(req, res){
	Card.getCards(function(err, cards){
		if (err){
			throw err;
		}
		res.json(cards);

	});
});

// Post Card
app.post('/api/cards', function(req, res){
	var card = req.body;
	Card.addCard(card, function(err, card){
		if (err){
			throw err;
		}
		res.json(card);

	});
});
// Get Banks
app.get('/api/banks', function(req, res){
	Bank.getBanks(function(err, banks){
		if (err){
			throw err;
		}
		res.json(banks);

	});
});
// Post Bank
app.post('/api/banks', function(req, res){
	var bank = req.body;
	Bank.addBank(bank, function(err, bank){
		if (err){
			throw err;
		}
		res.json(bank);

	});
});

// Put Bank -Update
app.put('/api/banks/:_id', function(req, res){
	var id = req.params._id;
	var bank = req.body;

	Bank.updateBank(id, bank, {}, function(err, bank){
		if (err){
			throw err;
		}
		res.json(bank);

	});
});
// Get Accounts
app.get('/api/accounts', function(req, res){
	Account.getAccounts(function(err, accounts){
		if (err){
			throw err;
		}
		res.json(accounts);

	});
});

// Post Account
app.post('/api/accounts', function(req, res){
	var account = req.body;
	Account.addAccount(account, function(err, account){
		if (err){
			throw err;
		}
		res.json(account);

	});
});
app.listen(3000);
console.log('Running on port 3000...');