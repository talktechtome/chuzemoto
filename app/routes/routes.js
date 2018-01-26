var User 	= require('../models/user.js')
var motocycles = require('../data/motorcycles.json')

module.exports = function(app, express) {

	// HOME PAGE - GET www.nameofapp.com/

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

		user.name.first = req.body.fname
		user.name.last = req.body.lname
		user.email = req.body.email
		user.password = req.body.password
		user.inseam = req.body.inseam

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

			// return a sucess message
			res.json({ message: 'User created!'})
		})
	})

	// LOGIN PAGE

	// GET - chuzemoto.herokuapp.com/login
	app.get('/login', function(req, res) {
		res.render("login.ejs")
	})

	// POST - chuzemoto.herokuapp.com/login
	app.post('/login', function(req, res) {

		// find the user (or at least check if exists)
		User.findOne({
			email: req.body.email
		}).exec(function(err, user) {

			if (err) throw err;

			// no user with that email is found
			if (!user) {
				res.json({
					success: false,
					message: 'No user with that email exists.'
				})
			}
			// if user is found
			else if (user) {

				// check if passwords match
				// if not matched, give error
				if (!(user.password == req.body.password)) {
					res.json({
						success: false,
						message: 'Sorry, wrong password.'
					})
				}

				// if matched, redirect to dashboard page.
				res.render('dashboard.ejs', { 'user': user })

			}
		})
	})

	// DASHBOARD PAGE

	// GET - chuzemoto.herokuapp.com/dashboard
	app.get('/dashboard', function(req, res){
		res.render
	})
}