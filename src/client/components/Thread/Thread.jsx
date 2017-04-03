import React, {Component} from 'react';
import {connect} from 'react-redux';
import Promise from 'bluebird';
import axios from 'axios';

import FlatButton from 'material-ui/FlatButton';

import {threadActions} from '../../actions/threadActions';

import Post from './Post/Post';
import AnswerInThreadForm from './AnswerInThreadForm/AnswerInThreadForm';

class Thread extends Component {
    constructor(props) {
        super(props);
        
        this.updateThread = this.updateThread.bind(this);
    }

    componentDidMount() {
        this.getInitialThread();
    }
    
    getInitialThread() {
        this.getThread()
            .then((thread) => {
                this.props.dispatch(threadActions.threadInit(thread));
            });
    }

    getThread() {
        return new Promise((resolve, reject) => {
            axios.get('/api/threads/' + this.props.routeParams.threadId)
                .then((response) =>{
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    updateThread(){
        this.getThread()
            .then((thread) => {
                this.props.dispatch(threadActions.threadUpdate(thread.posts));
            });
    }

    answerInThread() {
        console.log('cock');
    }

    renderPosts() {
        debugger
        return this.props.posts.map((post, postIndex) => {
            return (
                <Post 
                    key={post + postIndex}  
                    post={post}
                />
            );
        });
    }

    render() {
        return (
            <div className="thread-container">
                <div className="thread-controls">

                    <AnswerInThreadForm threadId={this.props.routeParams.threadId}/> 

                    <FlatButton className="update-thread-button"
                        label="Update thread" 
                        onTouchTap={this.updateThread} 
                    />   

                </div>

                <ul className="posts-list">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return state.thread;
}

export default connect(mapStateToProps)(Thread);