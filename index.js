global.__basedir = __dirname;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

const data = require('./dataParse/parser.js').getData('./data-sofia-oblast.json');

app.use(bodyParser.json());
app.use(express.static(path.join(__basedir, 'static')));


app.get('/', function (req, res) {
	res.sendFile(path.join(__basedir, 'index.html'));
});

app.get('/style.css', function (req, res) {
	res.sendFile(path.join(__basedir, 'style.css'));
});

app.get('/getData', function (req, res) {
	res.send(data);
});

app.get('*', function (req, res) {
	res.status(404).send('PAGE NOT FOUND!');
});

app.use(function (err, req, res, next) {
	if(err.message === 'BAD_REQUEST') {
		res.status(400).send('BAD REQUEST');
		return;
	}
	res.status(500).send('SERVER ERROR');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});