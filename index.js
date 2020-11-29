global.__basedir = __dirname;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

const fs = require('fs');
const { connect } = require('http2');

fs.readFile('./SPA-project/data-sofia-oblast.json', {encoding: 'utf-8'}, function (err, content){
    if(err) 
    {
        console.log(err); 
        return;
	}
	
	const data = JSON.parse(content);
	
    let parsedData = data.reduce(function(acc, current) {
		const name = current[1];
			const gradesCount = +(current[current.length - 2]);
			const average = parseFloat(current[current.length - 1].replace(',','.'));
			if(acc[name] == undefined){
				acc[name] = {sum: (gradesCount * average), count:(gradesCount)};
			}
			else 
			{
				acc[name].sum += gradesCount * average;
				acc[name].count += gradesCount;
			}

			return acc;
	}, {});
	
	const result = Object.keys(parsedData).reduce(function(acc, current) {
		const average = parsedData[current].sum / parsedData[current].count;
		acc[current] = average.toPrecision(3);
		return acc;
	}, {});

	console.log(result);
});

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