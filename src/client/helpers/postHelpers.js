export const addZero = (time) => {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

export const findReplyIndex = (posts, replyId) => {
    for(let postIndex = 0; postIndex < posts.length; postIndex++){
        if(posts[postIndex]._id === replyId){
            return postIndex;
        } 
    }
}