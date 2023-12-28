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
        data_array.push(individual_result.score);
        labels_array.push(individual_result.emotion);
    });

    console.log(data_array)
    console.log(labels_array)

    //Make the chart
    createRadarChart(labels_array, data_array, chart_title, element_id)
}