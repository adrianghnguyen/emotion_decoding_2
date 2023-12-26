function process_local_storage() {
    const all_local_keys = Object.keys(localStorage);
    
    // Do stuff for each saved submission entry
    all_local_keys.forEach(individual_key => {
        const raw_data_payload = localStorage.getItem(individual_key);
        const parsed_data = JSON.parse(raw_data_payload);
        
        // Place data into individualHTML div block
        const outputElement = document.createElement('div');
        html_content = process_data_html(parsed_data);
        outputElement.innerHTML = html_content;
        document.body.appendChild(outputElement)
    });
}

// Processes the previous submission entries and returns it as HTML
function process_data_html(parsed_data) {
    timestamp = parsed_data.timestamp
    original_input = parsed_data.inputText
    arr_emotion_results = parsed_data.emotion_results

    var html_content = `<div>`
    html_content += `<h3>${timestamp}</h3>`;
    html_content += `Input text: ${original_input}<br>`;

    // Emotions need to be processed by each individual entry
    emotion_print = JSON.stringify(arr_emotion_results, null, 4)
    html_content += `<br>${emotion_print}<br>`
    html_content += `</div>`

    console.log(html_content)
    return html_content
}

document.addEventListener('DOMContentLoaded', function() {
    process_local_storage();
});
