function process_local_storage() {
    const all_local_keys = Object.keys(localStorage);
    
    // Do stuff for each saved submission entry
    all_local_keys.forEach(individual_key => {
        const raw_data_payload = localStorage.getItem(individual_key);
        const parsed_data = JSON.parse(raw_data_payload);
        
        // Place data into individualHTML div block
        const outputElement = document.createElement('div'); // This line is creating a second-nested row of divs. IDK Why.
        html_content = process_data_html(parsed_data);
        outputElement.innerHTML = html_content;
        document.body.appendChild(outputElement)
    });
}

// Processes the previous submission entries and returns it as HTML
function process_data_html(parsed_data) {
    //TODO: Make this into a container for bootstrap. Remove the rendering html div block from the process_local_storage function?
    timestamp = parsed_data.timestamp
    original_input = parsed_data.inputText
    payload_emotion_results = parsed_data.emotionResults

    var html_content = `<div id=${parsed_data.keyName}>`
    html_content += `<h3>${timestamp}</h3>`;
    html_content += `${original_input}`;

    // Unpacks the emotion object into its individual score lines per emotion
    html_content += `<ul>`;

    payload_emotion_results.forEach(emotion_line =>{
        
        if (emotion_line.filter){ // Removing based on pre-filter model attribute
            html_content += `<li>${emotion_line.emotion} (${emotion_line.definition}) detected with a score of ${emotion_line.score.toFixed(3)}</li>`
        }
    })

    html_content += `</ul>`
    return html_content
}



document.addEventListener('DOMContentLoaded', function() {
    process_local_storage();
});
