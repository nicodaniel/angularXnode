'use strict';

angular.module('app').controller('HomeCtrl',
      ['$scope', '$http','HomeFactory',
  function($scope, $http, HomeFactory) {
       

       
      HomeFactory.countDLQueueRequest().success(function(data) {
       $scope.queues = data; 
      })
      .error(function(data, status, headers, config){
      
      });
      
    	function sortByDate(a, b) {
			 if (a._id.month < b._id.month) {
				return -1;
			 } else if (a._id.month > b._id.month) {
				return -1;
			 } else {
				if (a._id.day > b._id.day) {
				 return -1;
				}
			 }
			return 1;
		 } 
      
      $scope.graphData = [];
      HomeFactory.getCountQueueByDay().success(function(data) {
       var arr = data.result;
       arr.sort(function(a, b){
      	 if (a._id.month < b._id.month) {
  				return -1; //unsort
  			 } else if (a._id.month > b._id.month) {
  				return 1; //sort
  			 } else {
  				if (a._id.day > b._id.day) {
  				 return 1; 
  				}
  				return -1;
  			 }
       });
       $scope.graphData = data.result; 
      })
      .error(function(data, status, headers, config){
      
      });
       
      }]);

angular.module('app').directive(
'dlQueueBars',
[	function() {
 return { restrict : 'E',
	scope : { data : '=' }, 
	link : function(scope, element) {
	var margin = { top : 20, right : 20, bottom : 30, left : 40 },
			width = 480 - margin.left - margin.right,
			height = 360 - margin.top - margin.bottom;
	
	d3.select("#chart")
		.transition().ease("elastic");
	
	var svg = d3.select(element[0])
	.append("svg")
	.attr('width',	width + margin.left + margin.right)
	.attr('height',	height + margin.top + margin.bottom)
	.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scale.ordinal().rangeRoundBands([ 0, width ], .1);
	var y = d3.scale.linear().range([ height, 0 ]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom");
	var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

	//Render graph based on 'data'
	scope.render = function(data) {
	 //Set our scale's domains
	 x.domain(data.map(function(d) {
		var name = d._id.day+"-"+d._id.month+"-"+d._id.year;
		return name;
	 }));
	 
	 y.domain([ 0, d3.max(data, function(d) {
		return d.count;
	 }) ]);

	 //Redraw the axes
	 svg.selectAll('g.axis').remove();
	
	 //X axis
	 svg.append("g").attr("class", "x axis")
	 .attr("transform", "translate(0," + height + ")").call(xAxis);

	 //Y axis
	 svg.append("g").attr("class", "y axis")
	 .call(yAxis)
	 .append("text")
	 .attr( "transform", "rotate(-90)")
	 .attr("y", 6)
	 .attr("dy", ".71em")
	 .style("text-anchor", "end")
	 .text("Count");
	  
	 
	 var bars = svg.selectAll(".bar").data(data);
	 bars.enter()
	 .append("rect")
	 .attr("class", "bar")
	 .attr("x", function(d) {
		var name = d._id.day+"-"+d._id.month+"-"+d._id.year;
		return x(name);
	 })
	 .attr("width", x.rangeBand())
	 .on("mouseover", function(d) {
		var yPosition = parseInt(d3.select(this).attr("y") );
		var xPosition = parseInt(d3.select(this).attr("x") );
		var newXpos = xPosition+50;
		var newYpos = yPosition-50;
		tooltip.style('opacity', '1');
		tooltip.style("left", newXpos + "px");
		tooltip.html("count : "+d.count);
		tooltip.style("top", newYpos + "px");
	 	})
	 	.on("mouseout", function(d) {
		tooltip.style('opacity', '0');
	 });

	 //Animate bars
	 bars.transition().duration(1000).attr('height', function(d) {
		return height - y(d.count);
	 }).attr("y", function(d) {
		return y(d.count);
	 })
	};
	
		
	//Define tooltips
	 var tooltip = d3.select('#chart')                             
  .append('div')                                              
  .attr('class', 'tooltipp')  
	.style("opacity", 0)     //unvisible
	 

	//Watch 'data' and run scope.render(newVal) whenever it changes
	//Use true for 'objectEquality' property so comparisons are done on equality and not reference
	scope.$watch('data', function() {
	 scope.render(scope.data);
	}, true);
 } };
}]);

angular.module('app').directive(
	'dlQueuePie', function () {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			link: function (scope, element, attrs) {
				scope.$watch('data', function(values) {
					if(values) { 
						
						var width = 350,
						height = 350,
						radius = Math.min(width, height) / 2;
						var donutWidth = 75;
						
						var color = d3.scale.category20b();
						
						var arc = d3.svg.arc()
							.outerRadius(radius)
							.innerRadius(radius - donutWidth);
						
						var pie = d3.layout.pie()
							.sort(null)
							.value(function(d) { 
								return d.count; 
							});
						
						var svg = d3.select(element[0])
							.append("svg")
							.attr("width", width)
							.attr("height", height)
							.append("g")
							.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
						
						
							var total = 0;
							values.forEach(function(d) {
							 total +=d.count;
								d.count = +d.count;
							});
							
							var g = svg.selectAll(".arc")
								.data(pie(values))
								.enter().append("g")
								.attr("class", "arc")
  							.on("mouseover", function(d) {
  							 	tooltip.style('opacity', '1');
  								tooltip.html("queue : "+d.data._id+"<br/>"+"count : "+d.data.count);
  							})
  							.on("mouseout", function(d) {
  							 	tooltip.style('opacity', '0');
  							});
							
							g.append("path")
								.attr("d", arc)
								.style("fill", function(d) { return color(d.data._id); });
							
							g.append("text")
								.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
								.attr("dy", ".35em")
								.style("text-anchor", "middle")
								.text(function(d) { 
								 var val = ((d.data.count/total)*100);
								 var res = parseInt(val)+" %";
								 return res; });
							
						//Define tooltips
							 var tooltip = d3.select('#pie-chart')                             
						  .append('div')                                              
						  .attr('class', 'tooltip-pie')  
							.style("opacity", 0);     //unvisible
							 
						//legend : 
							 var legendRectSize = 18;
							 var textMargin = 4;
							
							 var width2 = 310;
							 var height2 = 350;
							 var svg2 = d3.select(element[0])
													  .append("svg")
													  .attr("width", width2)
													  .attr("height", height2)
							 
				       var legend = svg2.selectAll('.legend')                  
			          .data(color.domain())                                   
			          .enter()                                              
			          .append('g')                                            
			          .attr('class', 'legend')                               
			          .attr('transform', function(d, i) {                        
			            var horz = 10;                       
			            var vert = (i*25)+100;                      
			            return 'translate(' + horz + ',' + vert + ')';        
			          });  
				       
				       legend.append("svg")
				       	.append('rect')                                     
			          .attr('width', legendRectSize)                          
			          .attr('height', legendRectSize)                         
			          .style('fill', color)                                   
			          .style('stroke', color); 
				       
				        legend.append('text')   
				        .attr('x', legendRectSize+textMargin)
				        .attr('y', 12)
			          .text(function(d) {
			           return d; });  
							

					}
				})
			}
		}
	});

