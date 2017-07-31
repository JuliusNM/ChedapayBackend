var mongoose = require('mongoose');

//User Schema

var cardSchema = mongoose.Schema({
	CardNumber:{
		type: Number,
		required: true
	},
	CVV:{
		type: Number,
		required: true
	},
	ExpiryYear:{
		type: Number,
		required: true
	},
	ExpiryMonth:{
		type: Number,
		required: true
	},
	CardIssuer:{
		type: String,
		required: true
	}
	
});

var Card = module.exports = mongoose.model('Card', cardSchema);

//Get Cards

module.exports.getCards = function(callback, limit){
	Card.find(callback).limit(limit);
}

//Add Card
module.exports.addCard = function(card, callback){
	Card.create(card, callback);
}

//Update Card
module.exports.updateCard = function(id, card, options, callback){
	var query = { _id: id };
	var update = {
		CardNumber : card.CardNumber,
		CVV : card.CVV,
		ExpiryYear : card.ExpiryYear,
		ExpiryMonth : card.ExpiryMonth,
		CardIssuer : card.CardIssuer
	}
	Card.findOneAndUpdate(query, update, options, callback);
}
//Delete Card
module.exports.findOneAndDelete = function(id, callback){

	var query = { _id: id };
	Card.findOneAndRemove(query, callback);
}