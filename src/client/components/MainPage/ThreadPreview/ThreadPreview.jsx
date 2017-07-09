import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import Promise from 'bluebird';
import axios from 'axios';

import { Button } from 'semantic-ui-react';
import { Form, TextArea } from 'semantic-ui-react';
import { Comment, Header } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';

// import Post from './Post/Post';

import './ThreadPreview.scss';

export default class ThreadPreview extends Component {
    constructor(props) {
        super(props);
        
        this.openThread = this.openThread.bind(this);
        // this.updateThread = this.updateThread.bind(this);
        // this.sendPost = this.sendPost.bind(this);
        // this.changeRequestReadiness = this.changeRequestReadiness.bind(this);
    }

    // componentDidMount() {
    //     this.getInitialThread();
    // }
    
    // getThread() {
    //     return new Promise((resolve, reject) => {
    //         axios
    //         .get('/api/threads/' + this.props.routeParams.threadId)
    //         .then((response) =>{
    //             resolve(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     });
    // }

    // sendPost() {
    //     const {postText} = this.refs;

    //     if(this.refs.postText.ref.value !== ''){
    //         axios.post('/api/threads/' + this.props.thread._id, {
    //             text: postText.ref.value,
    //         })
    //         .then((response) => {
    //             this
    //             .props
    //             .dispatch(
    //                 threadActions
    //                 .threadUpdate(response.data)
    //             );

    //             this.clearInputs();
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    //     } else {
    //         if(this.props.settings.errorMessage.opened === false){
    //             this
    //             .props
    //             .dispatch(
    //                 settingsActions
    //                 .errorMessageOpen("Post text can't be empty")
    //             );

    //             setTimeout(() => {
    //                 this
    //                 .props
    //                 .dispatch(
    //                     settingsActions
    //                     .errorMessageClose()
    //                 );
    //             }, 5000);
    //         }
    //     }
    // }

    // getInitialThread() {
    //     this
    //     .getThread()
    //     .then((thread) => {
    //         if(thread.error){
    //             browserHistory.push('/404');
    //         } else {
    //             this
    //             .props
    //             .dispatch(
    //                 threadActions
    //                 .threadInit(thread)
    //             );
    //         }
    //     });
    // }

    // updateThread(){
    //     this
    //     .getThread()
    //     .then((thread) => {
    //         this
    //         .props
    //         .dispatch(
    //             threadActions
    //             .threadUpdate(thread.posts)
    //         );
    //     });
    // }

    // clearInputs(){
    //     const {postText} = this.refs;

    //     postText.ref.value = '';
    // }

    // renderErrorMessage(){
    //     if(this.props.settings.errorMessage.opened === true){
    //         return (
    //             <Message 
    //                 className="error-message" 
    //                 negative
    //             >
    //                 <Message.Header>
    //                     Posting error
    //                 </Message.Header>
    //                 <p>{this.props.settings.errorMessage.message}</p>
    //             </Message>
    //         );
    //     }
    // }

    openThread(){
        if(event.which == 2){
            console.log('middle');
        } else {
            console.log('left');
        }
        event.preventDefault();
        browserHistory.push('/threads/' + this.props.thread._id);
    }

    renderPosts() {
        const {posts, title, _id} = this.props.thread;
        
        if(posts.length > 0){
            return posts.map((post, postIndex) => {
                return (
                    <Post 
                        post={post} 
                        posts={posts}
                        postIndex={postIndex} 
                        threadTitle={postIndex === 0 ? title: ''}
                        reply={true}
                        key={'post' + post + postIndex}
                    />
                );
            });
        }
    }

    render() {
        console.log(this.props.thread);
        return (
            <div className="thread-container">
                <div className="thread-content">
                    {this.props.thread.title}
                    <a href="#" onClick={this.openThread}>Open</a>
                </div>
            </div>
        );
    }
}