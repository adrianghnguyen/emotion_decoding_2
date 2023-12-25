function displayLocalStorage() {
    // Retrieve all keys in localStorage
    const keys = Object.keys(localStorage);
    console.log(keys)

    // Create HTML content
    let htmlContent = '<h2>Previous local input results</h2><ul>';

    keys.forEach(key => {
        const value = localStorage.getItem(key);
        
        // Section header using the timestamp key
        //htmlContent += `<h3>${key}</h3>`; # Unused - local storage key id
        individual_entry = JSON.parse(value)
        htmlContent += `<h3>${individual_entry.timestamp}</h3>`
        htmlContent += `Input text: ${individual_entry.inputText}<br>`
        
        // Emotion printout
        arr_emotion_results = individual_entry.emotionResults // Array of emotion results
        emotion_print = JSON.stringify(arr_emotion_results, null, 4)
        htmlContent += `${emotion_print}<br>`
        
        // Print individual emotions
        for (let i = 0; i < arr_emotion_results.length; i++){
            let single_result = arr_emotion_results[i]
            console.log(single_result)
            //console.log(single_result.emotion)
            //console.log(single_result.definition)
            //console.log(single_result.score)
            
        }
        
    });


    htmlContent += '</ul>';

    // Display the HTML content
    document.getElementById('localStorageValues').innerHTML = htmlContent;
}

// Example usage
document.addEventListener('DOMContentLoaded', function() {
    displayLocalStorage();
});