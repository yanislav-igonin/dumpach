import React, {Component} from 'react';
import {connect} from 'react-redux';
import Promise from 'bluebird';
import axios from 'axios';
import {browserHistory} from 'react-router'

import { Button } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { Form, TextArea } from 'semantic-ui-react';
import { Comment, Header } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';

import ThreadPreview from './ThreadPreview/ThreadPreview';

import {settingsActions} from '../../actions/settingsActions';
import {threadsActions} from '../../actions/threadsActions';

import './MainPage.scss';

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.updateThreads = this.updateThreads.bind(this);
        this.createThread = this.createThread.bind(this);
    }

    componentDidMount() {
        this.getInitialThreads();
    }

    getThreads() {
        return new Promise((resolve, reject) => {
            axios
            .get('/api/threads?preview=true')
            .then((response) =>{
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        });
    }

    createThread(){
        const {threadTitle, threadOP} = this.refs;
        
        if(threadOP.ref.value !== ''){
            axios.post('/api/threads', {
                thread: {
                    title: threadTitle.inputRef.value,
                }, post: {
                    text: threadOP.ref.value,
                }
            })
            .then((response) => {
                browserHistory.push('/threads/' + response.data._id);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            if(this.props.settings.errorMessage.opened === false){
                this
                .props
                .dispatch(
                    settingsActions
                    .errorMessageOpen("Post text can't be empty")
                );

                setTimeout(() => {
                    this
                    .props
                    .dispatch(
                        settingsActions
                        .errorMessageClose()
                    );
                }, 5000);
            }
        }
    }
    
    getInitialThreads() {
        this
        .getThreads()
        .then((threads) => {
            this
            .props
            .dispatch(
                threadsActions
                .threadsInit(threads)
            );
        });
    }

    updateThreads(){
        this.getThreads()
        .then((threads) => {
            this
            .props
            .dispatch(
                threadsActions
                .threadsUpdate(threads)
            );
        });
    }

    renderThreadsPreview(){
        return this.props.threads.threads.map((thread, threadIndex) => {
            return (
                <ThreadPreview 
                    key={thread + threadIndex}
                    thread={thread}
                />
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

    render() {
        return (
            <div className="main-page-container">
                <div className="main-page-content">
                    <div className="post-form">
                        <Input
                            className="form-input"
                            ref="threadTitle"
                            placeholder="Thread Title"
                        />
                        <Form>
                            <TextArea
                                className="form-input"
                                ref="threadOP"
                                placeholder="Thread OP"
                                autoHeight
                            />
                        </Form>
                        <Button
                            className="form-submit-button"
                            primary 
                            onClick={this.createThread}
                        >
                            Create Thread
                        </Button>
                    </div>

                    <Header 
                        as='h3'
                        dividing
                    >
                        Threads
                    </Header>

                    {this.renderThreadsPreview()}

                    {this.renderErrorMessage()}
                </div>
            </div>
        );
    }
}
                    // <Comment.Group>
                    //     {this.renderPosts()}
                    // </Comment.Group>


function mapStateToProps(state, ownProps) {
    return state;
}

export default connect(mapStateToProps)(MainPage);
