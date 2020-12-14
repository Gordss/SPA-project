const ctx = document.getElementById('chart');

const Http = new XMLHttpRequest();
const url = '/getData';
Http.open("GET", url, 0);
Http.send();

const {towns, townAverage} = JSON.parse(Http.responseText);
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: towns,
        datasets: [{
            label: ['Town average grade'],
            data: townAverage,
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(11, 19, 118, 0.4)',
                'rgba(103, 251, 162, 0.4)',
                'rgba(141, 104, 233, 0.4)',
                'rgba(13, 151, 162, 0.4)',
                'rgba(37, 99, 119, 0.4)',
                'rgba(193, 153, 113, 0.4)',
                'rgba(11, 124, 100, 0.4)',
                'rgba(232, 1, 191, 0.4)',
                'rgba(52, 84, 13, 0.4)',
                'rgba(47, 91, 186, 0.4)',
                'rgba(34, 226, 186, 0.4)',
                'rgba(251, 19, 219, 0.4)',
                'rgba(95, 101, 189, 0.4)',
                'rgba(249, 167, 94, 0.4)',
                'rgba(31, 155, 187, 0.4)',
                'rgba(216, 235, 52, 0.4)',
                'rgba(28, 249, 142, 0.4)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(11, 19, 118, 1)',
                'rgba(103, 251, 162, 1)',
                'rgba(141, 104, 233, 1)',
                'rgba(13, 151, 162, 1)',
                'rgba(37, 99, 119, 1)',
                'rgba(193, 153, 113, 1)',
                'rgba(11, 124, 100, 1)',
                'rgba(232, 1, 191, 1)',
                'rgba(52, 84, 13, 1)',
                'rgba(47, 91, 186, 1)',
                'rgba(34, 226, 186, 1)',
                'rgba(251, 19, 219, 1)',
                'rgba(95, 101, 189, 1)',
                'rgba(249, 167, 94, 1)',
                'rgba(31, 155, 187, 1)',
                'rgba(216, 235, 52, 1)',
                'rgba(28, 249, 142, 1)'
            ],
            borderWidth: 1
        }]
    },
});