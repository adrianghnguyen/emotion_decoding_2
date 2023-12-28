function get_latest_emotion_result(){
  const latest_key = Object.keys(localStorage).sort()[0]; // Grab one key
  const raw_data_payload = localStorage.getItem(latest_key);
  return JSON.parse(raw_data_payload).emotionResults;
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

function render_latest_radar(chart_title, element_id) {
    //Retrieves the latest key in localStorage and calls the generic createRadarFunction to generate a chart
    const latest_key = Object.keys(localStorage).sort()[0]; // Grab one key
    const raw_data_payload = localStorage.getItem(latest_key);
    const parsed_data_emotion_results = JSON.parse(raw_data_payload).emotionResults;

    var data_array = [];
    var labels_array = [];

    // Get all the pairs of values for the (emotion,score) pairs
    parsed_data_emotion_results.forEach((individual_result) => {
//        console.log(individual_result.score);
//        console.log(individual_result.emotion);

        // Assuming you want to push these values into arrays
        // TODO: Remove or modify this filtering scheme
        if(individual_result.score > 0.1){
            data_array.push(individual_result.score);
        }
        else {
            data_array.push(null)
        }

        labels_array.push(individual_result.emotion);
    });

    console.log(data_array)
    console.log(labels_array)

    //Make the chart
    createRadarChart(labels_array, data_array, chart_title, element_id)
}



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

function createMultiRadarChart(element_id) // labels_var, dataset_var, element_id  
{
  const emotion_result = get_latest_emotion_result();
  const test_labels_var = emotion_result.map(result => result.emotion);
  const emotion_categories = Array.from(new Set(emotion_result.map(result => result.emotion_category)));
  
  // Iterate over each emotion category and create radar slices
  // for (const category of emotion_categories) {
  //     var resultObject = createRadarSlice(emotion_result, category)
  //     dataset_var.push(resultObject);    
  //   };
  
  var resulting_slice = createRadarSliceData(emotion_result, 'ambiguous')
  console.log(resulting_slice)
  dataset_var = [resulting_slice]

    const data = {
      labels: test_labels_var,
      datasets: dataset_var,
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