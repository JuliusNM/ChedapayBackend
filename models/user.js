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
	PassWord:{
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
	},
	RecipientId:{
		type: String,
		required: false
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
