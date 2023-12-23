
/*
Write all my jinja values into javascript for local storage

1. Get all my variables

*/

let key_name = new Date().getTime();
let input_text = "sample input"
let emotion_results = [1,2,3]
let timestamp = new Date().toISOString();


let jsonObject = {
    inputText: input_text,
    emotionResults: emotion_results,
    timestamp: timestamp
  };
  
  // Convert the object to a JSON string
  let jsonString = JSON.stringify(jsonObject);

  console.log(key_name)
  console.log(jsonString)
