'use strict';

const user = require('../models/user');

exports.getProfile = email => 

	new Promise((resolve,reject) => {

		user.find({ EmailAddress: EmailAddress }, { FirstName: 1, LastName: 1, PhoneNumber: 1, EmailAddress: 1, Created_at: 1, _id: 0 })

		.then(users => resolve(users[0]))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});