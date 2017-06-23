export const settingsActions = {

    errorMessageOpen(message) {
        return {
            type: 'ERROR_MESSAGE_OPEN',
            payload: message
        };
    },

    errorMessageClose() {
        return {
            type: 'ERROR_MESSAGE_CLOSE'
        };
    },
};
