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


const Recipient = module.exports = mongoose.model("Recipient", recipientSchema)

const user = new User({
	_id: user._id,
	FirstName : "Julius",
	LastName : "Ngigi",
	PhoneNumber : "+4557855222",
	EmailAddress : "juliusngigim@gmail.com"
});

user.save(function (err) {
  if (err) return handleError(err);
  
  const recipient1 = new Recipient({
    RecipientAccountNumber: "55511445",
	RecipientBank: "Faulu Bank",
	RecipientFirstName: "Margret",
	RecipientLastName: "King",
	Country: "Ghana",
    UserId: user._id   // assign the _id from the user
  });

   recipient1.save(function (err) {
    if (err) return handleError(err);
    
  });
});

Recipient.
  findOne({ RecipientFirstName: 'Margret'}).
  populate('UserId').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The user is %s', user.UserId.LastName);
    
  });


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