import React, {Component} from 'react';
import {connect} from 'react-redux';
import Promise from 'bluebird';
import axios from 'axios';

import { Button } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { Form, TextArea } from 'semantic-ui-react';
import { Comment, Header } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';

import {threadsActions} from '../../actions/threadsActions';

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.updateThreads = this.updateThreads.bind(this);
    }

    componentDidMount() {
        this.getInitialThreads();
    }
    
    getInitialThreads() {
        this
        .getThreads()
        .then((threads) => {
            this.props.dispatch(threadsActions.threadsInit(threads));
            console.log(threads);
        });
    }

    getThreads() {
        return new Promise((resolve, reject) => {
            axios
            .get('/api/threads')
            .then((response) =>{
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        });
    }

    updateThreads(){
        this.getThreads()
        .then((threads) => {
            this.props.dispatch(threadsActions.threadsUpdate(threads));
        });
    }

    renderThreadsPreview() {
        let _lastThread = false;

        return this.props.threads.map((thread, threadIndex) => {
            if(threadIndex === this.props.threads.length - 1){
                _lastThread = true;
            }
            return <ThreadPreview key={thread + threadIndex} thread={thread} lastThread={_lastThread} />;
        });
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
                            onClick={() => {}}
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

                </div>
            </div>
        );
    }
}
                    // <Comment.Group>
                    //     {this.renderPosts()}
                    // </Comment.Group>

                    // {this.renderErrorMessage()}

function mapStateToProps(state, ownProps) {
    return state.threads;
}

export default connect(mapStateToProps)(MainPage);
