export const settingsActions = {

    drawerUpdate(thread){
        return {
            type: 'DRAWER_UPDATE'
        }
    },

    snackbarUpdate(message){
        return {
            type: 'SNACKBAR_UPDATE',
            payload: message
        }
    }
    
}