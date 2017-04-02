export const threadsActions = {

    threadsInit(threads){
        return {
            type: 'THREADS_INIT',
            payload: threads
        }
    },

    threadsUpdate(threads){
        return {
            type: 'THREADS_UPDATE',
            payload: threads
        }
    }
    
}