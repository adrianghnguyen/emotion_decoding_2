// Holds all the helper scripts which are more UI-driven

/**
 * Enables the functionality to trigger alerts on specified HTML elements, facilitating the display of pop-up messages.
 * This feature is particularly beneficial for components like save buttons or notifications, providing user feedback.
 * The 'alert_type' parameter specifies the color of the alert element.
 * 
 * @param {string} placeholder_id - The ID of the HTML element where the alert will be displayed.
 * @param {string} button_id - The ID of the button triggering the alert.
 * @param {string} alert_message - The content of the alert message.
 * @param {string} alert_type - The color of the alert element.
 */
function alertTrigger(placeholder_id, button_id, alert_message, alert_type) {
    const alertPlaceholder = document.getElementById(placeholder_id);

    /**
     * Appends an alert to the specified HTML element with the provided message and type.
     * 
     * @param {string} message - The content of the alert message.
     * @param {string} type - The color type of the alert element.
     */
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');

        alertPlaceholder.append(wrapper);
    };

    const alertTriggerButton = document.getElementById(button_id);
    if (alertTriggerButton) {
        alertTriggerButton.addEventListener('click', () => {
            appendAlert(alert_message, alert_type);
        });
    }
}


