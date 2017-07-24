'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.loginUser = (email, password) => 

	new Promise((resolve,reject) => {

		user.find({EmailAddress: EmailAddress})

		.then(users => {

			if (users.length == 0) {

				reject({ status: 404, message: 'User Not Found !' });

			} else {

				return users[0];

			}
		})

		.then(user => {

			const Password = user.Password;

			if (bcrypt.compareSync(password, Password)) {

				resolve({ status: 200, message: EmailAddress });

			} else {

				reject({ status: 401, message: 'Invalid Credentials !' });
			}
		})

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});