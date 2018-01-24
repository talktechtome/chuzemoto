module.exports = function(app, express) {

	// HOME PAGE - GET www.nameofapp.com/

	app.get('/', function(req, res) {
		res.render("index.ejs")
	})

	// SIGNUP PAGE - GET nameofapp.com/signup

	app.get('/signup', function(req, res) {
		res.render("signup.ejs")
	})
}