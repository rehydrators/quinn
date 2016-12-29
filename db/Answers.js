var mongoose = require('mongoose');

var AnswerSchema = new Schema({
	answer: String,
	trim: true
});

var Answers = mongoose.model('Answers', AnswerSchema);
module.exports = Answers;