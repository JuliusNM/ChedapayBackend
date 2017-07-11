var mongoose = require('mongoose');

//User Schema

var bankSchema = mongoose.Schema({
	BankName:{
		type: String,
		required: true
	},
	BankCode:{
		type: Number,
		required: true
	}
	
});

var Bank = module.exports = mongoose.model('Bank', bankSchema);

//Get Banks

module.exports.getBanks = function(callback, limit){
	Bank.find(callback).limit(limit);
}

//Add Bank
module.exports.addBank = function(bank, callback){
	Bank.create(bank, callback);
}

//Update Bank
module.exports.updateBank = function(id, bank, options, callback){
	var query = { _id: id };
	var update = {
		BankName : bank.BankName,
		BankCode : bank.BankCode
	}
	Bank.findOneAndUpdate(query, update, options, callback);
}
//Delete Bank
module.exports.findOneAndDelete = function(id, callback){

	var query = { _id: id };
	Bank.findOneAndRemove(query, callback);
}