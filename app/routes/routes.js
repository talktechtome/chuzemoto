module.exports = function(app, express) {

	// HOME PAGE - GET www.nameofapp.com/

	app.get('/', function(req, res) {
		res.render("index.ejs")
	})
}