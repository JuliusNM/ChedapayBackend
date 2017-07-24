'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('./functions/register');
const login = require('./functions/login');
const profile = require('./functions/profile');
const password = require('./functions/password');
const config = require('./config/config.json');


const Recipient = require('./models/recipient');
const User = require('./models/user');
const Card = require('./models/card');
const Bank = require('./models/bank');
const Account = require('./models/account');
module.exports = router => {

	router.get('/', (req, res) => res.end('Counting Cheddar!'));

	router.post('/authenticate', (req, res) => {

		const credentials = auth(req);

		if (!credentials) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

			console.log("Attempting to login user...");
			login.loginUser(credentials.name, credentials.pass)

			.then(result => {
				console.log("success??");

				const token = jwt.sign(result, config.secret, { expiresIn: 1440 });
				console.log("created token?? " + token);

				res.status(result.status).json({ message: result.message, token: token });
				console.log("sent message with " + result.message);

			})

			.catch(err => {
				console.log("failure");
				res.status(err.status).json({ message: err.message })});
		}
	});

	router.post('/users', (req, res) => {

		const FirstName = req.body.FirstName;
		const LastName = req.body.LastName;
		const PhoneNumber = req.body.PhoneNumber;
		const EmailAddress = req.body.EmailAddress;
		const password = req.body.Password;

		// console.log(req.body);

		if (!FirstName || !LastName || !PhoneNumber || !EmailAddress || !password || !FirstName.trim() || !LastName.trim() || !PhoneNumber.trim() || !EmailAddress.trim() || !password.trim()) {

			res.status(400).json({message: 'Invalid Request !'});
			console.log("Can  not register");

		} else {
			//console.log(register.registerUser(FirstName, LastName,PhoneNumber, EmailAddress, password));

			register.registerUser(FirstName, LastName,PhoneNumber, EmailAddress, password)
			.then(result => {

				console.log(req.body);

				res.setHeader('Location', '/users/'+EmailAddress);
				res.status(result.status).json({ message: result.message })

			})

			.catch(err => res.status(err.status).json({ }));
		
		}
	});

	router.get('/users/:id', (req,res) => {

		if (checkToken(req)) {

			profile.getProfile(req.params.id)

			.then(result => res.json(result))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.put('/users/:id', (req,res) => {

		if (checkToken(req)) {

			const oldPassword = req.body.password;
			const newPassword = req.body.newPassword;

			if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {

				res.status(400).json({ message: 'Invalid Request !' });

			} else {

				password.changePassword(req.params.id, oldPassword, newPassword)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));

			}
		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.post('/users/:id/password', (req,res) => {

		const EmailAddress = req.params.id;
		const token = req.body.token;
		const newPassword = req.body.password;

		if (!token || !newPassword || !token.trim() || !newPassword.trim()) {

			password.resetPasswordInit(EmailAddress)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			password.resetPasswordFinish(EmailAddress, token, newPassword)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	function checkToken(req) {

		const token = req.headers['x-access-token'];

		if (token) {

			try {

  				var decoded = jwt.verify(token, config.secret);

  				return decoded.message === req.params.id;

			} catch(err) {

				return false;
			}

		} else {

			return false;
		}
	}
}