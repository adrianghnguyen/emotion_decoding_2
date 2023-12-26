function process_local_storage() {
    const all_local_keys = Object.keys(localStorage);

    // Create a container div to hold all entries
    const containerElement = document.createElement('div');

    // Do stuff for each saved submission entry
    all_local_keys.forEach(individual_key => {
        const raw_data_payload = localStorage.getItem(individual_key);
        const parsed_data = JSON.parse(raw_data_payload);

        // Place data into containerElement
        const html_content = process_data_html(parsed_data);

        // Append the entry HTML directly to the container
        containerElement.innerHTML += html_content;
    });

    // Append the container to the body outside the loop
    document.body.appendChild(containerElement);
}

// Processes the previous submission entries and returns it as HTML
function process_data_html(parsed_data) {
    const timestamp = parsed_data.timestamp;
    const original_input = parsed_data.inputText;
    const payload_emotion_results = parsed_data.emotionResults;

    let html_content = `<div id=${parsed_data.keyName}>`;
    html_content += `<h3>${timestamp}</h3>`;
    html_content += `${original_input}`;

    // Unpacks the emotion object into its individual score lines per emotion
    html_content += `<ul>`;

    payload_emotion_results.forEach(emotion_line => {
        if (emotion_line.filter) {
            // Removing based on pre-filter model attribute
            html_content += `<li>${emotion_line.emotion} (${emotion_line.definition}) detected with a score of ${emotion_line.score.toFixed(3)}</li>`;
        }
    });

    html_content += `</ul>`;
    html_content += `</div>`; // Close the container div for each entry
    return html_content;
}

document.addEventListener('DOMContentLoaded', function() {
    process_local_storage();
});
