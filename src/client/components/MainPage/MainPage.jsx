import React, {Component} from 'react';
import {connect} from 'react-redux';
import Promise from 'bluebird';
import axios from 'axios';
import {browserHistory} from 'react-router'

import { 
    Input,
    Button,
    Form, 
    TextArea, 
    Comment,
    Header,
    Message,
    Icon
} from 'semantic-ui-react'
import Dropzone from 'react-dropzone';

import ThreadPreview from './ThreadPreview/ThreadPreview';

import {settingsActions} from '../../actions/settingsActions';
import {threadsActions} from '../../actions/threadsActions';

import './MainPage.scss';

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postingInProgress: false,
            files: []
        };

        this.updateThreads = this.updateThreads.bind(this);
        this.createThread = this.createThread.bind(this);
        this.onDrop = this.onDrop.bind(this);
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
        const post = new FormData();
        const config = {
            onUploadProgress(progressEvent) {
                console.log(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }
        };
        
        if(threadOP.ref.value !== '' || this.state.files.length !== 0){
            post.append('title', threadTitle.inputRef.value);
            post.append('text', threadOP.ref.value);
            this.state.files.forEach((file, fileIndex) => {
                post.append('uploads[]', file, file.name);
            });

            axios.post('/api/threads',
                post, 
                config
            )
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
                    .errorMessageOpen("Post text or files can't be empty")
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

    onDrop(acceptedFiles, rejectedFiles){
        this.setState({files: acceptedFiles});
    }
        
    renderDropzoneContent() {
        let _content = <Icon name='file' />;

        if(this.state.files.length > 0){
            _content = this.renderDropzoneFilesPreview();
        }

        return _content;
    }

    renderDropzoneFilesPreview() {
        return this.state.files.map((file, fileIndex) => {
            return (
                <div key={file + fileIndex} className="file-preview-container">
                    {this.renderFileByType(file)}
                </div>
            );
        });
    }

    renderFileByType(file) {
        let _fileType = file.type.split('/'),
            _fileElement = null;

        if(_fileType[0] === 'image'){
            _fileElement = (
                <img 
                    key={file.preview} 
                    className="file-preview" 
                    src={file.preview} 
                />
            );
        } else {
            _fileElement = (
                <video 
                    key={file.preview} 
                    className="file-preview"
                >
                    <source src={file.preview} />
                </video>
            );
        }

        return _fileElement;
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
                        <Dropzone
                            className="post-form-dropzone"
                            accept={'image/*, video/webm'}
                            ref="postFiles"
                            onDrop={this.onDrop}
                        >
                            <div className="dropzone-content">
                                {this.renderDropzoneContent()}
                            </div>
                        </Dropzone>
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
