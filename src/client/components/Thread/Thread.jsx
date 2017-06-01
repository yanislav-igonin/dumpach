import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import Promise from 'bluebird';
import axios from 'axios';

import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import {settingsActions} from '../../actions/settingsActions';
import {threadActions} from '../../actions/threadActions';

import Post from './Post/Post';
import AnswerInThreadForm from './AnswerInThreadForm/AnswerInThreadForm';
import Menu from '../Menu/Menu';

class Thread extends Component {
    constructor(props) {
        super(props);
        
        this.updateThread = this.updateThread.bind(this);
        this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
    }

    componentDidMount() {
        this.getInitialThread();
    }
    
    getInitialThread() {
        this.getThread()
            .then((thread) => {
                if(thread.error){
                    browserHistory.push('/404');
                } else {
                    this.props.dispatch(threadActions.threadInit(thread));
                }
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

    handleSnackbarRequestClose() {
        this.props.dispatch(settingsActions.snackbarUpdate(''))
    }

    renderPosts() {
        const {posts, threadTitle} = this.props.thread;

        if(posts.length > 0){
            return posts.map((post, postIndex) => {
                return (
                    <Post 
                        key={post + postIndex}  
                        postIndex={postIndex}
                        threadTitle={threadTitle}
                        post={post}
                    />
                );
            });
        }
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

                    <Menu />

                </div>

                <ul className="posts-list">
                    {this.renderPosts()}
                </ul>

                <Snackbar
                    open={this.props.settings.snackbar.opened}
                    message={this.props.settings.snackbar.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackbarRequestClose}
                />

            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {
        thread: state.thread,
        settings: state.settings
    };
}

export default connect(mapStateToProps)(Thread);