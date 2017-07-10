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