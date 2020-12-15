const ctx = document.getElementById('chart');

function random_rgba() {
    let o = Math.round, r = Math.random, s = 255;
    let red = o(r()*s);
    let green = o(r()*s);
    let blue = o(r()*s);
    let additive = r().toFixed(1)
    let color = 'rgba(' + red + ',' + green + ',' + blue + ',' + additive + ')';
    let borderColor = 'rgba(' + red + ',' + green + ',' + blue + ',' + 1 + ')';
    return [color,borderColor];
}

const Http = new XMLHttpRequest();
const url = '/getData';
Http.open("GET", url, 0);
Http.send();

const {towns, townAverage, gradesPerTown} = JSON.parse(Http.responseText);

let colors = [];
let borderColors = [];
for (let i =0;i<towns.length;i++)
{
    let currentColors = random_rgba();
    colors.push(currentColors[0]);
    borderColors.push(currentColors[1]);
}

let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: towns,
        datasets: [{
            label: ['Town average grade'],
            data: townAverage,
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 1
        }]
    },
});


const table = document.getElementById('table');



for (let i=0;i<gradesPerTown.length;i++){
    let row = table.insertRow(i);
    let townCell = row.insertCell(0);
    let dataCell = row.insertCell(1);
    townCell.innerText = towns[i];
    dataCell.innerText = gradesPerTown[i]['count'];
}

let headerRow = table.insertRow(0);
let townName = headerRow.insertCell(0);
let townCount = headerRow.insertCell(1);
townName.innerText = "Име на населено място";
townCount.innerText = "Брой оценки от извадката";