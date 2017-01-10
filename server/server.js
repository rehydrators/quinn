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
			// // search Bing with the input question with 'wikipedia'
			var searchQuery = `${input} wikipedia`;
			var bingUrl = `https://api.cognitive.microsoft.com/bing/v5.0/search?q=${searchQuery}`;		
			var options = {
				url: bingUrl,
				method: 'GET',
				headers: {
					'Ocp-Apim-Subscription-Key': apiKey
				}
			};				

			// try wikipedia
			// var searchQuery = input;
			// var wikiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${searchQuery}`;		
			// var options = {
			// 	url: wikiUrl,
			// 	method: 'GET'				
			// };	
			request(options, function (error, response, body) {
			  var jsonData = JSON.parse(body);			  
			  if (!error && response.statusCode === 200) {	
					var searchItems = jsonData.webPages.value;
					var snippets = [];
					for (var i = 0; i < searchItems.length; i++) {
						var searchItem = searchItems[i];
						snippets.push(searchItem.snippet);
					}
					console.log(snippets);
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