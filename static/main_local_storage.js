function process_local_storage() {
    const all_local_keys = Object.keys(localStorage);
    
    // Do stuff for each saved submission entry
    all_local_keys.forEach(individual_key => {
        // Declare variables using var, let, or const
        const raw_data_payload = localStorage.getItem(individual_key);
        const parsed_data = JSON.parse(raw_data_payload);
        process_data(parsed_data);
    });
}

function process_data(parsed_data) {
    console.log(parsed_data);
}

console.log('Processing local storage script')
process_local_storage();