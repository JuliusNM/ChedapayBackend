const mongoose = require('mongoose');

//User Schema

const userSchema = mongoose.Schema({
	
	FirstName: String,
	LastName: String,
	PhoneNumber: String,	
	EmailAddress: String,
	PassWord:String,
	Created_at: String,
	temp_password	: String,
	temp_password_time: String	
	// CardId: String,
	// AccountId: String,		
	// RecipientId: String
	
});


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/chedapay');
module.exports = mongoose.model('user', userSchema);

//Get Users

module.exports.getUsers = function(callback, limit){
	User.find(callback).limit(limit);
}
//Add User
module.exports.addUser = function(user, callback){
	User.create(user, callback);
}

//Update User
module.exports.updateUser = function(id, user, options, callback){
	var query = { _id: id };
	var update = {
		FirstName : user.FirstName,
		LastName : user.LastName,
		PhoneNumber : user.PhoneNumber,
		EmailAddress : user.EmailAddress
	}
	User.findOneAndUpdate(query, update, options, callback);
}
