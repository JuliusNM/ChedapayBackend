var mongoose = require('mongoose');

//User Schema

var accountSchema = mongoose.Schema({
	AccountNumber:{
		type: Number,
		required: true
	},
	BankId:{
		type: String,
		required: true
	}
	
});

var Account = module.exports = mongoose.model('Account', accountSchema);

//Get Accounts

module.exports.getAccounts = function(callback, limit){
	Account.find(callback).limit(limit);
}

//Add Account
module.exports.addAccount = function(account, callback){
	Account.create(account, callback);
}