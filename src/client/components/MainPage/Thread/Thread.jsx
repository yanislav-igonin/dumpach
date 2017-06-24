import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import Promise from 'bluebird';
import axios from 'axios';

import { Button } from 'semantic-ui-react';
import { Form, TextArea } from 'semantic-ui-react';
import { Comment, Header } from 'semantic-ui-react';

import Post from './Post/Post';

import {settingsActions} from '../../../actions/settingsActions';
import {threadActions} from '../../../actions/threadActions';

import './Thread.scss';

class Thread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requestReadiness: 0
        };
        
        // this.updateThread = this.updateThread.bind(this);
        // this.changeRequestReadiness = this.changeRequestReadiness.bind(this);
    }

    componentDidMount() {
        this.getInitialThread();
    }
    
    getInitialThread() {
        this
        .getThread()
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
            axios
            .get('/api/threads/' + this.props.routeParams.threadId)
            .then((response) =>{
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        });
    }

    updateThread(){
        this
        .getThread()
        .then((thread) => {
            this
            .props
            .dispatch(
                threadActions
                .threadUpdate(thread.posts)
            );
        });
    }

    renderErrorMessage(){
        if(this.props.settings.errorMessage.opened === true){
            return (
                <Message 
                    className="error-message" 
                    negative
                >
                    <Message.Header>
                        Posting error
                    </Message.Header>
                    <p>{this.props.settings.errorMessage.message}</p>
                </Message>
            );
        }
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
                        threadId={_id}
                        reply={true}
                        key={'post' + post + postIndex}
                    />
                );
            });
        }
    }

    render() {
        return (
            <div className="thread-container">
                <div className="thread-content">
                    <div className="post-form">
                        <Form>
                            <TextArea
                                className="form-input"
                                ref="post-text"
                                placeholder="Text"
                                autoHeight
                            />
                        </Form>
                        <Button
                            className="form-submit-button"
                            primary 
                            onClick={this.sendPost}
                        >
                            Send Post
                        </Button>
                    </div>

                    <Header 
                        as='h3'
                        dividing
                    >
                        Posts
                    </Header>

                     <Comment.Group>
                         {this.renderPosts()}
                    </Comment.Group>

                    {this.renderErrorMessage()}
                </div>
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