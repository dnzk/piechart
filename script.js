(function(d3) {

  'use strict';

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
    .value(function(d) {
      return d.count;
    }).sort(null);

  var path = svg.selectAll('path')
    .data(pie([{
      label: '',
      count: 10
    }]))
    .enter()
    .append('path')
      .attr('d', arc)
      .attr('fill', function(d, i) {
        return color(d.data.label);
      });
  
  var daset = [];

  function buildDataset(label, count, dataset) {
    if (label && count) {
      var index = -1;

      dataset.forEach(function(set, idx) {
        if (set.label === label) {
          index = idx;
        }
      });

      if (index > -1) {
        dataset[index].count = count;
      } else {
        dataset.push({
          label: label,
          count: count
        });
      }
    }
    return dataset;
  }

  function cleanFields(fields) {
    fields.forEach(function(field) {
      field.value = null;
    });
  }

  function writeBuiltObject(dataset) {
    document.getElementById('cache').innerHTML = JSON.stringify(dataset);
  }

  var addDatum = document.getElementById('add-datum');

  addDatum.addEventListener('click', function() {

    var label = document.querySelector('[name="label"]').value;
    var value = parseFloat(document.querySelector('[name="value"]').value);

    daset = buildDataset(label, value, daset);

    cleanFields([document.querySelector('[name="label"]'), document.querySelector('[name="value"]')]);

    writeBuiltObject(daset);

  });

  var generateChart = document.getElementById('generate-chart');

  generateChart.addEventListener('click', function() {
    svg.selectAll('path').data(pie(daset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d, i) {
        return color(d.data.label);
      });
  });

})(d3);
