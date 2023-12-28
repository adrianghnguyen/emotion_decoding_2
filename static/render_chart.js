// From the browser storage, return the latest stored object based on the greatest key value
function retrieveLatestStoredLocalStorage(){
    const all_keys = Object.keys(localStorage).sort(); // Sorting in ascending key value
    const latest_key = all_keys[all_keys.length-1] //

    const latest_data_payload = localStorage.getItem(latest_key);
    const parsed_data = JSON.parse(latest_data_payload)

    console.log('Retrieving latest stored key from local storage')

    return parsed_data
}

function retrieveLatestEmotionObject(){
    console.log('Retrieving only the emotion_results from the latest item in local_storage')
    return retrieveLatestStoredLocalStorage().emotionResults
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


// Detailed radar chart for all 28 emotion scores
function render_latest_radar(chart_title, element_id) {
    // Placing the data into the correct format for the radar chart to be created
    console.log('Creating detailed radar chart')
    const parsed_data_emotion_results = retrieveLatestStoredLocalStorage().emotionResults

    // Need to sort the data before placing it into the array in order to 'cluster' them by overall sentiment (positive/negative/etc.)
    sorted_data = sorted_emotions(parsed_data_emotion_results)
//    console.log(sorted_data)

    var data_array = [];
    var labels_array = [];



//    parsed_data_emotion_results.forEach((individual_result) => {
//        console.log(`${individual_result.emotion},${individual_result.score}`)
//        data_array.push(individual_result.score)
//        labels_array.push(individual_result.emotion);
//    });

    sorted_data.forEach((individual_result) => {

        // Set values which don't pass the filter to 0 to not clog up the radar chart
        if(individual_result.filter){
            data_array.push(individual_result.score)
        }
        else{
            data_array.push(null)
        }

        labels_array.push(individual_result.emotion);
    });


    //Make the chart
    createRadarChart(labels_array, data_array, chart_title, element_id)
}

// Helper function to get unique values based on a specific attribute
const getUniqueValues = (array, attribute) => {
  const uniqueValuesSet = new Set(array.map(item => item[attribute]));
  return Array.from(uniqueValuesSet);
};

// Function to calculate the average of a specific attribute
const calculateAverage = (array, attribute) => {
  const attributeValues = array.map(item => item[attribute]);

  // Check if attributeValues is not empty to avoid division by zero
  if (attributeValues.length === 0) {
    return 0;
  }

  const sum = attributeValues.reduce((acc, value) => acc + value, 0);
  const average = sum / attributeValues.length;
  return average;
};


// Return all scores for a specific category
function categoryScore(latest_emotion_object, category){

    var temp_all_scores = []

    for(line of latest_emotion_object){
        if(line.emotion_category == category){ // Need to look into making this generic?
            temp_all_scores.push(line.score)
        }
    }

    return temp_all_scores
}

function radarEmotionCategories(element_id){
    console.log('Creating higher-level emotion categories categories')
    const latest_emotion_object = retrieveLatestEmotionObject()
    const higher_emotion_categories = getUniqueValues(latest_emotion_object, 'emotion_category') // This will become the label

    console.log(latest_emotion_object)

    positive_scores = categoryScore(latest_emotion_object, 'negative')
    console.log(positive_scores)

//    var higher_emotion_data = []
//    average_score = calculateAverage(latest_emotion_object, 'score')
//    console.log(average_score)

}

// Takes in emotion results and adds the values of 0 if not in the category, or adds it to create 'leaves' of data
// which can be  different sets of data in the radar chart  -- deprecated function to remove?
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