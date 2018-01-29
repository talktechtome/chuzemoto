
var mongoose	= require('mongoose')
var Schema		= mongoose.Schema

// User Schema
var UserSchema	= new Schema({
	name: {
		first: String,
		last: String
	},
	email: {
		type: String,
		required: true,
		index: { unique: true }
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	inseam: {
		type: Number,
		required: true
	},
	recommendations: {
		type: Array
	}
})

module.exports = mongoose.model('User', UserSchema)
