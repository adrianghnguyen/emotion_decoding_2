// From the browser storage, return the latest stored object based on the greatest key value
function retrieveLatestStoredLocalStorage() {
  const all_keys = Object.keys(localStorage).sort(); // Sorting in ascending key value
  const latest_key = all_keys[all_keys.length - 1] //

  const latest_data_payload = localStorage.getItem(latest_key);
  const parsed_data = JSON.parse(latest_data_payload)

  console.log('Retrieving latest stored payload from local storage')
  console.log(parsed_data)

  return parsed_data
}

// Processes the local storage object to only return the emotionResults object
function retrieveLatestEmotionObject() {
  console.log('Retrieving only the emotion_results from the latest item in local_storage')
  return retrieveLatestStoredLocalStorage().emotionResults
}

// Basic radar chart builder which is going to be used by more complex ones
Chart.defaults.color = '#FFF';

function createRadarChart(labels_var, data_var, chart_title, element_id) {
  const data = {
    labels: labels_var,
    datasets: [{
      label: chart_title,
      data: data_var,
      fill: true,
      spanGaps: true
    }]
  };

  const config = {
    type: 'radar',
    data: data,
    options: {
      spanGaps: false,
      scales: {
        r: {
          grid:{
            circular: true,
            color: 'rgba(255,255,255,0.5)'
          },
          ticks: {
            showLabelBackdrop: false,
            stepSize: 0.2
          },
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

// Returns object of emotionResults in an order which clusters them by higher emotion_order categories (positive/negative/ambiguous/neutral)
function sorted_emotions(emotions_results) {

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
  var sorted_results = needSort.sort(function (a, b) {
    return order.indexOf(a.emotion) - order.indexOf(b.emotion);
  });

  return sorted_results
}


// Detailed radar chart for all 28 emotion scores - TBH this chart isn't very useful
function radarDetailed(obj_emotion_result, element_id) {
  // Placing the data into the correct format for the radar chart to be created
  console.log('Creating detailed radar chart')

  // Need to sort the data before placing it into the array in order to 'cluster' them by overall sentiment (positive/negative/etc.)
  sorted_data = sorted_emotions(obj_emotion_result)

  var data_array = [];
  var labels_array = [];

  sorted_data.forEach((individual_result) => {

    // Set values which don't pass the filter to 0 to not clog up the radar chart
    if (individual_result.filter) {
      data_array.push(individual_result.score)
    }
    else {
      data_array.push(null)
    }

    labels_array.push(individual_result.emotion);
  });


  //Make the chart
  createRadarChart(labels_array, data_array, 'Emotion score', element_id)
}

// Helper function to get unique values based on a specific attribute
const getUniqueValues = (array, attribute) => {
  const uniqueValuesSet = new Set(array.map(item => item[attribute]));
  return Array.from(uniqueValuesSet);
};

function calculateAverage(array) {
  if (array.length === 0) {
    return 0; // Handle the case where the array is empty to avoid division by zero
  }

  const sum = array.reduce((acc, value) => acc + value, 0);
  const average = sum / array.length;
  return average;
}

// Return all scores for attribute emotion_category in emotion_object
function allCategoryScores(emotion_object, category) {

  var temp_all_scores = []

  for (line of emotion_object) {
    if (line.emotion_category == category) { // Need to look into making this generic? Add a parameter named attribute?
      temp_all_scores.push(line.score)
    }
  }

  return temp_all_scores
}

// For an emotionResults array, use specific emotion_category to return the average value for its score attribute
function averageCategoryScore(emotion_object, category) {

  all_scores = allCategoryScores(emotion_object, category)
  average = calculateAverage(all_scores)
  console.log(`Average score for ${category} is ${average}`)
  return average
}

// Takes list of categories and returns an array of their averages in the passed order
function allAverageCategoryScores(emotion_object, list_of_categories) {

  temp_all_average_scores = []

  for (category of list_of_categories) {
    result = averageCategoryScore(emotion_object, category)
    temp_all_average_scores.push(result)
  }

  return temp_all_average_scores
}

function radarEmotionCategories(emotion_result_object, element_id) { // Right now hard-coded to do it off the latest results
  console.log('Creating higher-level emotion categories categories')
  const higher_emotion_categories = ['positive','ambiguous','negative','neutral']
  // const higher_emotion_categories = getUniqueValues(emotion_result_object, 'emotion_category') // This will become the label

  
  // Filter the values in order to avoid zero-values of emotion_scores dragging down the average
  filtered_emotion_object = emotion_result_object.filter((emotion_result) => emotion_result.filter)

  chart_data = allAverageCategoryScores(filtered_emotion_object, higher_emotion_categories)

  createRadarChart(higher_emotion_categories, chart_data, 'Category average', element_id)
}