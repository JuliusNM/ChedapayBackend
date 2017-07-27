var mongoose = require('mongoose');

//Recipients Schema
const User = require('./user');

var recipientSchema = mongoose.Schema({

	RecipientAccountNumber:String,
	RecipientBank:String,
	RecipientFirstName:String,
	RecipientLastName: String,
	Country: String,
	User: { type:Schema.ObjectId, ref:"User", childPath:"Recipients" }

});

recipientSchema.plugin(relationship, { relationshipPathName:'User' });

var Recipient = module.exports = mongoose.model("Recipient", recipientSchema)

var user = new User({});
user.save();
var recipient = new Recipient({User:User._id});
recipient.save() //the parent children property will now contain child's id
//child.remove() //the parent children property will no longer contain the child's id

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