// Produces the browser local storage data as a page result element
function create_historical_results(target_element_id) {
    // This function should probably be refactored to take in an output from get_json_local_storage()
    const all_local_keys = Object.keys(localStorage).sort(); //Sorted in old->new order based on key timestamp.

    // Create a container div to hold all entries
    const containerElement = document.createElement('div');
    containerElement.classList.add('container');

    // Do stuff for each saved submission entry
    all_local_keys.forEach(individual_key => {
        const raw_data_payload = localStorage.getItem(individual_key);
        const parsed_data = JSON.parse(raw_data_payload);

        // Place data into containerElement
        const html_content = process_data_html(parsed_data);

        // Append the entry HTML directly to the container
        containerElement.innerHTML += html_content;
    });

    // Write the content to a specific element ID
    const targetElement = document.getElementById(target_element_id);

    if (target_element_id) {
        targetElement.appendChild(containerElement);
    } else {
        console.error(`Element with ID '${target_element_id}' not found.`);
    }
}

// Processes the previous emotion submission entries in the browser local and returns it as HTML
function process_data_html(parsed_data) {

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };


    const timestamp = new Date(parsed_data.timestamp).toLocaleString('en-US', options);
    const original_input = parsed_data.inputText;
    const payload_emotion_results = parsed_data.emotionResults;

    let html_content = `<div id=${parsed_data.keyName}>`;
    html_content += `<hr>`;
    html_content += `<h4>${timestamp}</h4>`;
    html_content += `<p>${original_input}</p>`;

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

// Reads local storage in order to get all stored key objects
function get_json_local_storage(){
    const all_local_keys = Object.keys(localStorage).sort(); //Sorted in old->new order based on key timestamp
    var json_local_storage = []

    // Places entirety of local storage data into a JSON object
    all_local_keys.forEach(individual_key => {
        const raw_data_payload = localStorage.getItem(individual_key);
        const parsed_data = JSON.parse(raw_data_payload);
        json_local_storage.push(parsed_data)
    })

    return json_local_storage
}

// Allows user to export the historical data submission entries stored within their browser inside local storage
function export_browser_data_as_json(filename){
    const stored_data = {
        'stored_data': get_json_local_storage(),
        'uuid': Date.now()
    }

    console.log('Exporting the following data')
    download_json(stored_data,filename)
    console.log('Exported browser data as JSON')
}

// Exports text variable to a browser modal dialog for download
function download_text(text, filename){
  var blob = new Blob([text], {type: "text/plain"});
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

// Prompts user to save json object from browser
function download_json(json_object, filename){
  const blob = new Blob([JSON.stringify(json_object, null, 2)], {type: "application/json",});
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

// Clear browser storage information and wipes historical data TODO: Brings into script main_local_storage.js?
function clear_local_storage() {
    localStorage.clear();
    console.log('Local storage has been cleared')
    alert('Local Storage cleared!');
    $('#clear_local_storageModal').modal('hide');
}