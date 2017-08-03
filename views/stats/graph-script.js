const Chart = require('chart.js');
console.log(myData)
var cals = [];
var dates = [];

for (let day of myData) {
	cals.push(day.cals);
	dates.push(day.date);
}

console.log('**************************', cals,dates);

var ctx = document.getElementById("myLineChart").getContext('2d');
var myLineChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: dates,
		datasets: [{
			label: 'calories',
			backgroundColor: 'red',
			borderColor: 'black',
			data: cals, 
		}]
	},
	options: {}
});
