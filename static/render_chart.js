var emotionsArray = [
  'admiration',
  'amusement',
  'anger',
  'annoyance',
  'approval',
  'caring',
  'confusion',
  'curiosity',
  'desire',
  'disappointment',
  'disapproval',
  'disgust',
  'embarrassment',
  'excitement',
  'fear',
  'gratitude',
  'grief',
  'joy',
  'love',
  'nervousness',
  'neutral',
  'optimism',
  'pride',
  'realization',
  'relief',
  'remorse',
  'sadness',
  'surprise'
]

var randomValuesArray = [];
for (var i = 0; i < 20; i++) {
  var randomValue = Math.random(); // Generates a random value between 0 (inclusive) and 1 (exclusive)
  randomValuesArray.push(randomValue);
}


data = [{
  type: 'scatterpolar',
  theta: emotionsArray, // TODO: Values should be passed in by clusters - positive, negative, neutral, ambiguous in order to section them
  r: randomValuesArray,
  fill: 'toself'
}]

layout = {
  polar: {
    radialaxis: {
      visible: true,
      range: [0, 1]
    }
  },
  showlegend: true,
  title: 'Radar chart',
//  paper_bgcolor: 'rgba(255, 0, 0, 0)',
}


Plotly.newPlot("myChart", data, layout)
