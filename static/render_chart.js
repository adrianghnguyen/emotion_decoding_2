// From the browser storage, return the latest stored object based on the greatest key value
function retrieveLatestStoredLocalStorage(){
    const all_keys = Object.keys(localStorage).sort(); // Sorting in ascending key value
    const latest_key = all_keys[all_keys.length-1] //

    const latest_data_payload = localStorage.getItem(latest_key);
    const parsed_data = JSON.parse(latest_data_payload)

    console.log('Returning latest stored key')
    console.log(parsed_data)

    return parsed_data
}

function createRadarChart(labels_var, data_var, chart_title, element_id)
{
    const data = {
      labels: labels_var,
      datasets: [{
        label: chart_title,
        data: data_var,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    };

    const config = {
      type: 'radar',
      data: data,
      options: {
        spanGaps: false,
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 1
            }
        },
        elements: {
          line: {
            borderWidth: 2
          }
        }
      },
    };

    const ctx = document.getElementById(element_id).getContext('2d');
    new Chart(ctx, config);
}

function sorted_emotions(emotions_results){

    const emotionsOrder = [
      'admiration',
      'amusement',
      'approval',
      'caring',
      'desire',
      'excitement',
      'gratitude',
      'joy',
      'love',
      'optimism',
      'pride',
      'relief',
      'anger',
      'annoyance',
      'disappointment',
      'disapproval',
      'disgust',
      'embarrassment',
      'fear',
      'grief',
      'nervousness',
      'remorse',
      'sadness',
      'confusion',
      'curiosity',
      'realization',
      'surprise',
      'neutral'
    ];

    var needSort = emotions_results
    var order = emotionsOrder

    //Stole from StackOverflow
    var sorted_results = needSort.sort(function(a,b){
      return order.indexOf(a.emotion) - order.indexOf(b.emotion);
    });

    return sorted_results
}


function render_latest_radar(chart_title, element_id) {
    const parsed_data_emotion_results = retrieveLatestStoredLocalStorage().emotionResults
    console.log(parsed_data_emotion_results)

    // Need to sort the data before placing it into the array in order to 'cluster' them by overall sentiment (positive/negative/etc.)
//    sorted_data = sorted_emotions(parsed_data_emotion_results)
//    console.log(sorted_data)

    var data_array = [];
    var labels_array = [];

    // Placing the data into the correct format for the radar chart to be created
    console.log('Radar chart values produced')

    parsed_data_emotion_results.forEach((individual_result) => {
        console.log(`${individual_result.emotion},${individual_result.score}`)
        data_array.push(individual_result.score)
        labels_array.push(individual_result.emotion);
    });

    //Make the chart
    createRadarChart(labels_array, data_array, chart_title, element_id)
}

// Takes in emotion results and adds the values of 0 if not in the category, or adds it to create 'leaves' of data
// which can be  different sets of data in the radar chart
function createRadarSliceData(emotion_result, category) {
  const data = [];

  for (const emotion_score of emotion_result) {
    if (emotion_score.emotion_category === category) {
      data.push(emotion_score.score);
    } else {
      data.push(0);
    }
  }

  const radar_slice = {
    label: category,
    data: data
  };

  return radar_slice;
}