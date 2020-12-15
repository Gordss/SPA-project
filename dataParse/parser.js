const fs = require('fs');

// './data-sofia-oblast.json'

module.exports.getData = function (filename) {

    const dataRaw = fs.readFileSync(filename, {encoding: 'utf-8'});
    const data = JSON.parse(dataRaw);
        
    let parsedData = data.reduce(function(acc, current) {
        const municipalityName = current[1];
            const gradesCount = +(current[current.length - 2]);
            const average = parseFloat(current[current.length - 1].replace(',','.'));
            if(acc[municipalityName] == undefined){
                acc[municipalityName] = {sum: (gradesCount * average), count:(gradesCount)};
            }
            else 
            {
                acc[municipalityName].sum += gradesCount * average;
                acc[municipalityName].count += gradesCount;
            }
            return acc;
    }, {});
    
    const towns = [];
    const townAverage = [];
    const gradesPerTown =[];
    const result = Object.keys(parsedData).reduce(function(acc, current) {
        gradesPerTown.push(parsedData[current]);
        const average = (parsedData[current].sum / parsedData[current].count).toPrecision(3);
        acc[current] = average;
        towns.push(current);
        townAverage.push(average);
        return acc;
    }, {});
    //console.log(towns);
    //console.log(townAverage);
    return {towns, townAverage,gradesPerTown};
}