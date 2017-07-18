var mongoose = require('mongoose');

//User Schema

var accountSchema = mongoose.Schema({
	AccountNumber:{
		type: Number,
		required: true
	},
	BankName:{
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

//Update Account
module.exports.updateAccount = function(id, account, options, callback){
	var query = { _id: id };
	var update = {
		AccountNumber : account.AccountNumber,
		BankName : account.BankName
	}
	Account.findOneAndUpdate(query, update, options, callback);
}

//Delete Account
module.exports.findOneAndDelete = function(id, callback){

	var query = { _id: id };
	Account.findOneAndRemove(query, callback);
}