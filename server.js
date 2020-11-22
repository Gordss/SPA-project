"use strict"

const fs = require('fs');
const express = require('express');

fs.readFile('./data.json', {encoding: 'utf-8'}, function (err, content){
    if(err) 
    {
        console.log(err); 
        return;
    }

    var data = JSON.parse(content);
    //console.log(data);
});

function renderBody(params) {
    return `
    <!DOCTYPE html>
    <html lang="en-US">
    <head>
    	<meta charset="utf-8">
    	<meta http-equiv="X-UA-Compatible"  content="IE=Edge">
    	<meta name="viewport"   content="width=device-width, initial-scale=1">
    	<title>Scriptable > Pie | Chart.js sample</ title>
    	<link rel="stylesheet" type="text/css" href=".. /style.css">
    	<script src="../../../dist/2.9.4/Chart.min. js"></script>
    	<script src="../utils.js"></script>
    </head>
    <body>
    	<div class="content">
    		<div class="wrapper"><canvas    id="chart-0"></canvas></div>
    		<div class="toolbar">
    			<button onclick="randomize()    ">Randomize</button>
    			<button onclick="addDataset()">Add  Dataset</button>
    			<button onclick="removeDataset()    ">Remove Dataset</button>
    			<button onclick="togglePieDoughnut()    ">Toggle Doughnut View</button>
    		</div>
    	</div>
    	<script>
    		var DATA_COUNT = 5;
    
    		var utils = Samples.utils;
    
    		utils.srand(110);
    
    		function colorize(opaque, hover, ctx) {
    			var v = ctx.dataset.data[ctx.dataIndex] ;
    			var c = v < -50 ? '#D60000'
    				: v < 0 ? '#F46300'
    				: v < 50 ? '#0358B6'
    				: '#44DE28';
            
    			var opacity = hover ? 1 - Math.abs(v /  150) - 0.2 : 1 - Math.abs(v / 150);
            
    			return opaque ? c : utils.  transparentize(c, opacity);
    		}
        
    		function hoverColorize(ctx) {
    			return colorize(false, true, ctx);
    		}
        
    		function generateData() {
    			return utils.numbers({
    				count: DATA_COUNT,
    				min: -100,
    				max: 100
    			});
    		}
        
    		var data = {
    			datasets: [{
    				data: generateData(),
    			}]
    		};
        
    		var options = {
    			legend: false,
    			tooltips: false,
    			elements: {
    				arc: {
    					backgroundColor: colorize.bind  (null, false, false),
    					hoverBackgroundColor:   hoverColorize
    				}
    			}
    		};
        
    		var chart = new Chart('chart-0', {
    			type: 'pie',
    			data: data,
    			options: options
    		});
        
    		// eslint-disable-next-line no-unused-vars
    		function randomize() {
    			chart.data.datasets.forEach(function    (dataset) {
    				dataset.data = generateData();
    			});
    			chart.update();
    		}
        
    		// eslint-disable-next-line no-unused-vars
    		function addDataset() {
    			chart.data.datasets.push({
    				data: generateData()
    			});
    			chart.update();
    		}
        
    		// eslint-disable-next-line no-unused-vars
    		function removeDataset() {
    			chart.data.datasets.shift();
    			chart.update();
    		}
        
    		// eslint-disable-next-line no-unused-vars
    		function togglePieDoughnut() {
    			if (chart.options.cutoutPercentage) {
    				chart.options.cutoutPercentage = 0;
    			} else {
    				chart.options.cutoutPercentage =    50;
    			}
    			chart.update();
    		}
        
    	</script>
    </body>
    </html>
    `
}

const app = express();
const port = 3000;

app.get('/index.html', (req, res) => {
    res.send(renderBody({ name: 'Default' }));
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});