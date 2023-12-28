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
    const parsed_data_emotion_results = get_latest_emotion_result() // Retrieved from local_storage

    var data_array = [];
    var labels_array = [];

    // Placing the data into the correct format for the radar chart to be created
    parsed_data_emotion_results.forEach((individual_result) => {
        if(individual_result.filter){
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