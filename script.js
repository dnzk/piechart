(function(d3) {

  'use strict';

  var dataset = [
    { label: 'Abulia', count: 10 },
    { label: 'Betelgeuse', count: 20 },
    { label: 'Cantaloupe', count: 30 },
    { label: 'Djikstra', count: 40 }
  ];

  var width = 360;
  var height = 360;
  var radius = Math.min(width, height) / 2;

  var color = d3.scale.category20b();

  var svg = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) + ', ' + (height / 2) + ')');

  var arc = d3.svg.arc()
    .outerRadius(radius);

  var pie = d3.layout.pie()
    .value(function(d) { return d.count; })
    .sort(null);

  var path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d, i) {
      return color(d.data.label);
    });

  var daset = [];

  var addDatum = document.getElementById('add-datum');
  addDatum.addEventListener('click', function() {

    var label = document.querySelector('[name="label"]').value;
    var value = parseFloat(document.querySelector('[name="value"]').value);

    if (label && value) {
      daset.push({
        label: label,
        value: value
      });
    }

    document.querySelector('[name="label"]').value = null;
    document.querySelector('[name="value"]').value = null;

    document.getElementById('cache').innerHTML = JSON.stringify(daset);

  });

  var generateChart = document.getElementById('generate-chart');
  generateChart.addEventListener('click', function() {
    console.log(daset);
  });

})(d3);
