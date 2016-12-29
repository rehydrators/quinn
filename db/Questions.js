var mongoose = require('mongoose');

var QuestionSchema = new Schema({
	question: String,
	trim: true
});

var Questions = mongoose.model('Question', QuestionSchema);
module.exports = Questions;