var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var quora = require('quora-api');
var app = express();
var port = 3030;

// mongoose.connect('mongodb://localhost:27017/quinn');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {	
	res.sendFile(path.join(__dirname, '../client/web/assets/index.html'));
});

app.get('/getAnswers', (req, res) => {
	var input = req.query.question;

	var question = function(input) {
		var dashedQuestion = input.replace(/[' ']/gi, '-');
		return dashedQuestion;
	};

	quora.answer(question(input)).then(answer => {
		var fullAnswer = function() {
			if (!!answer.answer0) {
				return answer.answer0.split('.')
			} else {
				return ["I don't know", "It's hard to say"];		
				// hit Bing API to use it's NLP
					// search Bing with the input question with 'quora'
					// return the answer from Bing				
			}				
		};
		var summary = `${fullAnswer()[0]}. ${fullAnswer()[1]}.`;
		res.send(summary);
	});
});

app.use(express.static(path.join(__dirname, '../client/web')));

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});