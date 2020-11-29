global.__basedir = __dirname;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__basedir, 'static')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__basedir, 'index.html'));
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