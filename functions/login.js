'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.loginUser = (emailAddress, password) => 

	new Promise((resolve,reject) => {

		user.find({EmailAddress: emailAddress})

		.then(users => {

			if (users.length == 0) {
				reject({ status: 404, message: 'User Not Found !' });
			} else {
				const user = users[0];
				const hashedPassword = user.Password;

				if (bcrypt.compareSync(password, hashedPassword)) {
					resolve({ status: 200, message: emailAddress });
				} else {
					reject({ status: 401, message: 'Invalid Credentials !' });
				}
			}
		})
		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});
