var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var port = 3030;

mongoose.connect('mongodb://localhost:27017/quinn');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// catch 404's to pass to error handler
// app.use(function(req, res, next) {
// 	var err = new Error('File not found');
// 	err.status = 404;
// 	return next(err);
// });

// handler for 404 errors
// app.use(function(err, req, res, next) {
// 	res.status(err.status || 500);
// 	res.send('error', {
// 		message: err.message,
// 		error: {}
// 	});
// });

app.get('/', (req, res) => {	
	res.sendFile(path.join(__dirname, '../client/web/assets/index.html'));
});

app.get('/getAnswers', (req, res) => {
	// refactor with mock data later
	res.send('Send some mock data');
});

app.use(express.static(path.join(__dirname, '../client/web')));

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});