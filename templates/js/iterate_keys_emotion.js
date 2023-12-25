test_object = {
    "inputText": "sadas",
    "emotionResults": [
        {
            "emotion": "neutral",
            "definition": "No particular emotion label detected",
            "score": 0.9617330431938171,
            "filter": true
        },
        {
            "emotion": "approval",
            "definition": "Having or expressing a favorable opinion",
            "score": 0.009196995757520199,
            "filter": false
        }
    ],
    "timestamp": "2023-12-24T01:40:48.208Z"
}

arr_emotion_results = individual_entry.emotionResults // Array of emotion results
console.log(arr_emotion_results.length)
emotion_print = JSON.stringify(arr_emotion_results, null, 4)
htmlContent += `${emotion_print}<br>`

emotion_results = test_object.emotionResults
console.log(test_object.emotionResults[0])

for (let i = 0; i < emotion_results.length; i++){
    console.log(emotion_results[i])
}