export const threadActions = {

    threadInit(thread){
        return {
            type: 'THREAD_INIT',
            payload: thread
        }
    },

    threadUpdate(posts){
        return {
            type: 'THREAD_UPDATE',
            payload: posts
        }
    }
    
}