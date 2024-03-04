// From the browser storage, return the latest stored object based on the greatest key value
// This function should be replaced by local_storage.js functions
function retrieveLatestStoredLocalStorage() {

  const all_keys = Object.keys(localStorage).sort(); // Sorting in ascending key value
  const latest_key = all_keys[all_keys.length - 1] //

  const latest_data_payload = localStorage.getItem(latest_key);
  const parsed_data = JSON.parse(latest_data_payload)

  console.log('Retrieving latest stored payload from local storage')
  return parsed_data
}

// Processes the local storage object to only return the emotionResults object
function retrieveLatestEmotionObject() {
  console.log('Retrieving only the emotion_results from the latest item in local_storage')
  return retrieveLatestStoredLocalStorage().emotionResults
}

// Basic radar chart builder which is going to be used by more complex ones
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
          grid: {
            circular: true,
          },
          ticks: {
            showLabelBackdrop: false,
            stepSize: 0.2
          },
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: 0.4
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

// ---------------------------------------------------- RADAR FUNCTIONS ----------------------------------------------------
// Creates radar chart which clusters for the 4 higher level sentiment positive/negative/neutral/amb
function radarEmotionCategories(emotion_result_object, element_id) { // Right now hard-coded to do it off the latest results
  console.log('Creating higher-level emotion categories categories')
  const higher_emotion_categories = ['positive', 'ambiguous', 'negative', 'neutral'] // Using hard-coded values to force radar to output in a specific and create axes. Positive needs to be opposite of negative.

  //Prep the data for the chart
  filtered_emotion_object = emotion_result_object.filter((emotion_result) => emotion_result.filter)     // Remove zero-values of emotion_scores dragging down the average

  // Need to align it with the labels position
  chart_data = allAverageCategoryScores(filtered_emotion_object, higher_emotion_categories) // Creates data format appropriate for chart.js since it looks at the position with the labels
  sorted_chart_data = []
  for (category of higher_emotion_categories) {
    sorted_chart_data.push(chart_data[category])
  }

  createRadarChart(higher_emotion_categories, sorted_chart_data, 'Category average', element_id)
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

// ---------------------------------------------------- LINE CHART FUNCTIONS ----------------------------------------------------
// Takes in all data retrieved from local storage and display as a line chart
function lineChartTimelineCategory(all_data, element_name) {
  console.log('Creating timeline linechart')

  var all_average_scores = []
  const higher_emotion_categories = ['positive', 'negative', 'ambiguous', 'neutral']
  var x_axis = []

  // Go through each user-submitted entry log
  category_timeline_values = {}
  for (let entry of all_data) {

    // Get all the average values as an array in chronological order
    category_averages_dict = allAverageCategoryScores(entry.emotionResults, higher_emotion_categories)
    for (category of higher_emotion_categories) {

      // Initialize the array if not already done
      if (!category_timeline_values[category]) {
        category_timeline_values[category] = [];
      }

      category_timeline_values[category].push(category_averages_dict[category])
    }

    //Timestamp
    timestamp = entry.timestamp
    x_axis.push(timestamp)
  }

  console.log(category_timeline_values)

  temp_dataset_array = []

  for (const [category,data_values] of Object.entries(category_timeline_values)){
    let individual_dataset = {
      label: category,
      data: data_values,
      tension: 0.1
    }

    temp_dataset_array.push(individual_dataset)
  }

  datasets = temp_dataset_array

    // Create the chart
  data = {
  	labels: x_axis,
  	datasets: datasets
  }
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                }
            }
        }
    };

    new Chart(
        document.getElementById(element_name), // The element on which the chart will be rendered
        config
    )
}

// ---------------------------------------------------- HELPER FUNCTIONS ----------------------------------------------------
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

// Takes list of categories and returns an array of their averages in the passed order
function allAverageCategoryScores(emotion_object, list_of_categories) {

  all_average_scores = {}

  for (category of list_of_categories) {
    all_average_scores[category] = []
  }

  // Get all the respective results for a specific category and accumulates it into an array
  for (line of emotion_object) {
    for (category of list_of_categories) {
      if (category == line.emotion_category) {
        all_average_scores[category].push(line.score)
      }
    }
  }

  // Store it as an object to make it independent of order that the values were placed in
  average_score_dict = []
  for (const [key, value] of Object.entries(all_average_scores)) {
    average_score_dict[key] = calculateAverage(value)
  }

  return average_score_dict
}

// Takes list of categories and returns an array of their averages in the passed order
function allAverageCategoryScores_v2(emotion_object, list_of_categories) {

  temp_all_average_scores = []

  for (category of list_of_categories) {
    result = averageCategoryScore(emotion_object, category)
    entry = {
      category: category,
      average_score: result
    }

    temp_all_average_scores.push(entry)
  }

  return temp_all_average_scores
}

// Take emotion_result object and computes the category averages which is returned for the timeline
function convertResultSentimentAverage(emotion_result_object) {
  // Hard-coded to specify a return order
  const higher_emotion_categories = ['positive', 'negative', 'ambiguous', 'neutral'] // This will become the label

  //Prep the data for the chart
  filtered_emotion_object = emotion_result_object.filter((emotion_result) => emotion_result.filter)   // Remove zero-values of emotion_scores dragging down the average
  averaged_sentiment_results = allAverageCategoryScores_v2(filtered_emotion_object, higher_emotion_categories)

  computed_averages = {
    average_category_score: averaged_sentiment_results
  }

  return computed_averages
}

// Creates a frequency chart counting the occurrence of the emotion in the history
function createFrequencyChart(local_storage_data) {
  var emotion_occurence = [];

  // Compute how many times each emotion occurred
  local_storage_data.forEach(local_entry => {
    emotion_results = local_entry.emotionResults;
    let filtered_result = emotion_results.filter((single_emotion_score) => single_emotion_score['filter']);
    emotion_occurence.push(filtered_result);
    // console.log(result)
  });

  const flat_emotion_occurence = emotion_occurence.flat();

  // Use reduce to count occurrences of each emotion
  const emotion_counts = flat_emotion_occurence.reduce((counts, entry) => {
    const emotion = entry.emotion;
    counts[emotion] = (counts[emotion] || 0) + 1;
    return counts;
  }, {});

  // Transform the result into an array of objects
  const resultArray = Object.keys(emotion_counts).map(emotion => ({
    emotion: emotion,
    occurrence: emotion_counts[emotion]
  }));

  // Log or use the result as needed
  console.log(resultArray);
}


