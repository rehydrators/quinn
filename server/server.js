var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');
var quora = require('quora-api');
var apiKey = require('./api/API_KEYS');
var app = express();
var port = 3030;
var apiKey = apiKey;

var randomizer = function(arr) {
	return Math.floor(Math.random() * arr.length);
}

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

	// format input to match Quora's query string requirement
	var question = function(input) {		
		var dashedQuestion = input.replace(/[' ']/gi, '-');
		return dashedQuestion;
	};

	quora.answer(question(input)).then(answer => {			
		if (!!answer.answer0) {
			var answers = answer.answer0.split('.');
			answers.pop();
			if ( !isNaN(parseInt(answers[answers.length - 1])) ) {
				answers.pop();
			}
			answers = answers.join('.').replace(/[.]/gi, '.\n\n');
			res.send(answers + '.');
		} else {				
			// search Bing with the input question with 'quora'
			var searchQuery = `${input} quora`;
			var bingUrl = `https://api.cognitive.microsoft.com/bing/v5.0/search?q=${searchQuery}`;		
			var options = {
				url: bingUrl,
				method: 'GET',
				headers: {
					'Ocp-Apim-Subscription-Key': apiKey
				}
			};				

			// hit Bing API to use it's NLP				
			request(options, function (error, response, body) {
			  var jsonData = JSON.parse(body);
			  // console.log(jsonData.webPages);
			  var snippets = jsonData.webPages.value.map(function(query) {
			  	return query.snippet;
			  });
			  console.log(jsonData);
			  if (!error && response.statusCode == 200) {	
					// return the answer from Bing
					// console.log(snippets);
					res.send(snippets[randomizer(snippets)]);				    
			  }
			})
		}
	});
});

app.use(express.static(path.join(__dirname, '../client/web')));

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});