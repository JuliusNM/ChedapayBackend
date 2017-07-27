var mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Recipients Schema
const User = require('./user');

var recipientSchema = mongoose.Schema({

	RecipientAccountNumber:String,
	RecipientBank:String,
	RecipientFirstName:String,
	RecipientLastName: String,
	Country: String,
	UserId: [{ type:Schema.Types.ObjectId, ref:"User"}]

});


var Recipient = module.exports = mongoose.model("Recipient", recipientSchema)

//Get Recipients

module.exports.getRecipients = function(callback, limit){
	Recipient.find(callback).limit(limit);
}

//Add Recipient
module.exports.addRecipient = function(recipient, callback){
	Recipient.create(recipient, callback);
}

//Update Recipient
module.exports.updateRecipient = function(id, recipient, options, callback){
	var query = { _id: id };
	var update = {
		RecipientAccountNumber : recipient.RecipientAccountNumber,
		RecipientBank : recipient.RecipientBank,
		RecipientFirstName : recipient.RecipientFirstName,
		RecipientLastName : recipient.RecipientLastName,
		Country : recipient.Country
	}
	Recipient.findOneAndUpdate(query, update, options, callback);
}

//Delete Recipient
module.exports.findOneAndDelete = function(id, callback){

	var query = { _id: id };
	Recipient.findOneAndRemove(query, callback);
}