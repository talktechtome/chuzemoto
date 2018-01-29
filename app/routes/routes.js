
var User 	= require('../models/user.js')
var motorcycles = require('../data/motorcycles.json')

module.exports = function(app, express) {

	var gloabalUser = [];

	// HOME PAGE 
	// GET chuzemoto.herokuapp.com/

	app.get('/', function(req, res) {
		res.render("index.ejs")
	})

	// SIGNUP PAGE

	// GET chuzemoto.herokuapp.com/signup
	app.get('/signup', function(req, res) {
		res.render("signup.ejs")
	})

	// POST chuzemoto.herokuapp.com/signup
	app.post('/signup', function(req, res) {

		var user = new User()
		var recommendations = []

		user.name.first = req.body.fname
		user.name.last = req.body.lname
		user.email = req.body.email
		user.password = req.body.password
		user.inseam = req.body.inseam

		const inseam = parseInt(req.body.inseam)

		var height;
		const max = inseam + 1
		const min = inseam - 1

		for(var x in motorcycles) {
			 height = parseInt(motorcycles[x].ht, 10)

			// create an array of recommended bikes
			if ( height <= max && height >= min ) {
				recommendations.push(motorcycles[x])
			}
		}

		user.recommendations = recommendations

		user.save(function(err) {
			if (err) {
				// duplicate entry
				if (err.code == 11000)
					return res.json({ 
						success: false, 
						message: 'A user with email already exists.'
					})
				else
					return res.send(err)
			}

			// return user object
			globalUser = user;
			// res.redirect('/dashboard')

			console.log(user)

			res.render('dashboard.ejs', {
					data: user
			});
		})
	})

	// LOGIN PAGE

	// GET - chuzemoto.herokuapp.com/login
	app.get('/login', function(req, res) {
		res.render("login.ejs")
	})

	// POST - chuzemoto.herokuapp.com/login
	app.post('/login', function(req, res) {

		var loggedUser;

		// find the user (or at least check if exists)
		User.findOne({
			email: req.body.email
		}).exec(function(err, ret_user) {

			// loggedUser = ret_user;

			// if (err) throw err;

			// // no user with that email is found
			// if (!ret_user) {
			// 	res.json({
			// 		success: false,
			// 		message: 'No user with that email exists.'
			// 	})
			// }
			// // if user is found
			// else if (ret_user) {

			// 	// check if passwords match
			// 	// if not matched, give error
			// 	if (!(ret_user.password == req.body.password)) {
			// 		res.json({
			// 			success: false,
			// 			message: 'Sorry, wrong password.'
			// 		})
			// 	}
			// }
			res.render('dashboard.ejs', { data: ret_user })
		})
	})

	// DASHBOARD PAGE
	app.get('/dashboard', function(req, res) {
		// res.render('dashboard.ejs')
	})

	// LOGOUT PAGE
	app.get('/logout', function(req, res) {
		res.redirect('/');
	})
}
