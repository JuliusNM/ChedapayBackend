'use strict';

const express    = require('express');        
const app        = express();                
const bodyParser = require('body-parser');
const logger 	   = require('morgan');
const router 	   = express.Router();
const port 	   = process.env.PORT || 3000;

const mongoose = require('mongoose');

app.use(logger('dev'));

app.use(bodyParser.json());

// Recipient = require('./models/recipient');
// User = require('./models/user');
// Card = require('./models/card');
// Bank = require('./models/bank');
// Account = require('./models/account');

//connect to mongoose
// mongoose.connect('mongodb://localhost/chedapay');
// var db = mongoose.connection;

require('./routes')(router);

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
		res.json({
			"id": recipient._id,
			"status": {
				"code": 200,
				"message": "w/e"
			} 
		});

	});
});

// Update Recipient
app.put('/api/recipients/:_id', function(req, res){
	var id = req.params._id;
	var recipient = req.body;

	Recipient.updateRecipient(id, recipient, {}, function(err, recipient){
		if (err){
			throw err;
		}
		res.json(recipient);

	});
});

// Delete Recipient
app.delete('/api/recipients/:_id', function(req, res){
	var id = req.params._id;
	// console.log(Recipient);
	Recipient.findOneAndDelete(id, function(err, recipient){
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

// Update User
app.put('/api/users/:_id', function(req, res){
	var id = req.params._id;
	var user = req.body;

	User.updateUser(id, user, {}, function(err, user){
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

// Update Card
app.put('/api/cards/:_id', function(req, res){
	var id = req.params._id;
	var card = req.body;

	Card.updateCard(id, card, {}, function(err, card){
		if (err){
			throw err;
		}
		res.json(card);

	});
});
// Delete Card
app.delete('/api/cards/:_id', function(req, res){
	var id = req.params._id;
	// console.log(Recipient);
	Card.findOneAndDelete(id, function(err, card){
		if (err){
			throw err;
			console.log("We failed")
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
// Update bank
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
// Delete Bank
app.delete('/api/banks/:_id', function(req, res){
	var id = req.params._id;
	// console.log(Recipient);
	Bank.findOneAndDelete(id, function(err, bank){
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

// Update Account
app.put('/api/accounts/:_id', function(req, res){
	var id = req.params._id;
	var account = req.body;

	Account.updateAccount(id, account, {}, function(err, bank){
		if (err){
			throw err;
		}
		res.json(account);

	});
});

// Delete Account
app.delete('/api/accounts/:_id', function(req, res){
	var id = req.params._id;
	
	Account.findOneAndDelete(id, function(err, account){
		if (err){
			throw err;
		}
		res.json(account);

	});
});
app.listen(3000,"0.0.0.0");
console.log('Running on port 3000...');