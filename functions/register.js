'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = (firstName, lastName, phoneNumber, emailAddress, password) => 
	new Promise((resolve,reject) => {

	    const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		const newUser = new user({

			FirstName: firstName,
			LastName: lastName,
			PhoneNumber: phoneNumber,
			EmailAddress: emailAddress,
			Password: hash,
			Created_at: new Date()
		});

		newUser.save()

		.then(() => {
		 	resolve({ status: 201, message: 'User Registered Sucessfully !' })
		 })
		.catch(err => {
			
			console.log("there's an error");

			if (err.code == 11000) {

				reject({ status: 409, message: 'User Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});