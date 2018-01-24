// server.js
// LOAD THE PACKAGES
var express 	= require("express")
var app 		= express();	// creating an express framework for the app
var port 		= process.env.PORT || 8080
var mongoose	= require("mongoose")
var config		= require('./config')
var morgan		= require('morgan')
var path		= require('path')
var bodyParser	= require('body-parser')

// APP CONFIGUARATION

// use body parser so we can grab info from POST requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
	next()
})

// log all requests on the console
app.use(morgan('dev'))

// connect to our database 
// mongoose.connect(config.database);

// sets up ejs as view engine
app.set("view engine", "ejs")
// app.set('views', path.join(__dirname, '/public/views'))

// set static files location
// used for requests that our front end will make
app.use(express.static(__dirname + 'public'))

// ROUTES FOR OUR API
var apiRoutes = require('./app/routes/routes.js')(app, express)

// START THE server
app.listen(port)
console.log('The magic happens on port ' + port)