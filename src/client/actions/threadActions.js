export const threadActions = {

    threadInit(thread){
        return {
            type: 'THREAD_INIT',
            payload: thread.posts
        }
    },

    threadUpdate(posts){
        return {
            type: 'THREAD_UPDATE',
            payload: thread.posts
        }
    }
    
}