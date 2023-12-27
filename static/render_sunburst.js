//var file = 'https://raw.githubusercontent.com/plotly/datasets/master/coffee-flavors.csv'
var file = 'static/emotions_mapping.csv'

d3.csv(file, function(err, rows){
  function unpack(rows, key) {
  return rows.map(function(row) {return row[key]})
}

  var data = [{
        type: "sunburst",
        maxdepth: 4,
        ids: unpack(rows, 'ids'),
        labels: unpack(rows, 'labels'),
        parents: unpack(rows, 'parents'),
        textposition: 'inside',
        insidetextorientation: 'horizontal'
  }]

  var layout = {
        margin: {l: 0, r: 0, b: 0, t:0},
        paper_bgcolor: 'rgba(0,0,0,0)'
  }

  Plotly.newPlot('myChart', data, layout)
})
