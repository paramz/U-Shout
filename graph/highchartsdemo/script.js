$(function(){ //jquery ready function
	var STEPS = 20;
	var Y_MAX=10;
	var y_values =[];
	var x_values =[];
	for(var i=0;i<STEPS;i++)
	{
		x_values.push(i);
		y_values.push(Math.round(Math.random()*Y_MAX));
	}
	
	function changeProgress(to)
	{
		var chart = $("#bar").highcharts();
		chart.xAxis[0].removePlotBand('progress');
		chart.xAxis[0].addPlotBand({
			color:'red',
			from: 0,
			to: to,
			id: 'progress'
		});
	}
	
	$('#bar').highcharts({
		chart: {
			margin: 0,
			type: 'area',
			events:{
				click: function(e) {
					$("#display").text("clicked "+e.xAxis[0].value);
					changeProgress(e.xAxis[0].value);
				}
			}
		},
		title: {
			text:null
		},
		xAxis: {
			lineWidth: 0,
			minorGridLineWidth: 0,
			lineColor: 'transparent',
			labels: {
				enabled:false
			},
			minorTickLength: 0,
			tickLength: 0,
			minPadding: 0,
            maxPadding: 0
		},
		yAxis: {
			labels: {
				enabled:false
			},
			title:{
				text:null
			},
			gridLineColor: 'transparent'
		},
		legend: {
			enabled:false
		},
		tooltip: {
			headerFormat: '',
			pointFormat: '{point.y} comments',
			crosshairs: true,
			enabled:false
		},
		credits:{
			enabled:false
		},
		plotOptions: {
			series: {
				pointPadding: 0,
				groupPadding: 0,  
				point: {
                    events: {
                        click: function() {
							$("#display").text("clicked "+this.x);
							changeProgress(this.x);
						}
                    }
                }
			},
			area: {
				marker: {
					enabled: false,
					symbol: 'circle',
					radius: 2,
					states: {
						hover: {
							enabled: true
						}
					}
				}
			}
		},
		series: [{
			name: 'comments',
			data: y_values
		}],
	});
});