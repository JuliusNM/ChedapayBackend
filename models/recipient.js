var mongoose = require('mongoose');

//Recipients Schema

var recipientSchema = mongoose.Schema({
	RecipientAccountNumber:{
		type: String,
		required: true
	},
	RecipientBank:{
		type: String,
		required: true
	},
	RecipientFirstName:{
		type: String,
		required: true
	},
	RecipientLastName:{
		type: String,
		required: true
	},
	Country:{
		type: String,
		required: true
	}
});

var Recipient = module.exports = mongoose.model('Recipient', recipientSchema);

//Get Recipients

module.exports.getRecipients = function(callback, limit){
	Recipient.find(callback).limit(limit);
}