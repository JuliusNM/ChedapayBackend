var mongoose = require('mongoose');

//User Schema

var userSchema = mongoose.Schema({
	FirstName:{
		type: String,
		required: true
	},
	LastName:{
		type: String,
		required: true
	},
	PhoneNumber:{
		type: String,
		required: true
	},
	EmailAddress:{
		type: String,
		required: true
	},
	CardId:{
		type: String,
		required: true
	},
	AccountId:{
		type: String,
		required: true
	}
});

var User = module.exports = mongoose.model('User', userSchema);

//Get Users

module.exports.getUsers = function(callback, limit){
	User.find(callback).limit(limit);
}
//Add User
module.exports.addUser = function(user, callback){
	User.create(user, callback);
}
