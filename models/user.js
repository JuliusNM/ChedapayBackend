const mongoose = require('mongoose');

//User Schema

const userSchema = mongoose.Schema({
	FirstName: String,
	LastName: String,
	PhoneNumber: String,
	EmailAddress: String,
	Password:String,
	Created_at: String,
	temp_password	: String,
	temp_password_time: String,
	RecipientList: [],
	BankList: [],
	CardList: [],
});


mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://julius:julius@ds129352.mlab.com:29352/chedapay');

const userModel =  mongoose.model('user', userSchema);
module.exports = userModel;

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
