import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import Promise from 'bluebird';
import axios from 'axios';

import { 
    Button,
    Form, 
    TextArea, 
    Comment,
    Header,
    Message,
    Icon,
    Checkbox 
} from 'semantic-ui-react'
import Dropzone from 'react-dropzone'

import Post from './Post/Post';

import {settingsActions} from '../../../actions/settingsActions';
import {threadActions} from '../../../actions/threadActions';

import './Thread.scss';

class Thread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requestReadiness: 0,
            files: []
        };
        
        // this.updateThread = this.updateThread.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.sendPost = this.sendPost.bind(this);
        // this.changeRequestReadiness = this.changeRequestReadiness.bind(this);
    }

    componentDidMount() {
        this.getInitialThread();
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

    sendPost() {
        const {postText} = this.refs;
        let post = new FormData();
        let config = {
            onUploadProgress(progressEvent) {
                console.log(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                _this.props.changeRequestReadiness((progressEvent.loaded * 100) / progressEvent.total);
            }
        };

        if(this.refs.postText.ref.value !== '' || this.state.files.length !== 0){
            post.append('text', this.refs.postText.ref.value);
            // post.append('sage', this.state.sage);
            this.state.files.forEach((file, fileIndex) => {
                post.append('uploads[]', file, file.name);
            });

            axios.post('/api/threads/' + this.props.thread._id,
                post, 
                config
            )
            .then((response) => {
                this
                .props
                .dispatch(
                    threadActions
                    .threadUpdate(response.data)
                );

                this.clearInputs();
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

    getInitialThread() {
        this
        .getThread()
        .then((thread) => {
            if(thread.error){
                browserHistory.push('/404');
            } else {
                this
                .props
                .dispatch(
                    threadActions
                    .threadInit(thread)
                );
            }
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

    clearInputs(){
        const {postText} = this.refs;

        postText.ref.value = '';
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
                                ref="postText"
                                placeholder="Text"
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
                        <Checkbox label="Sage" />
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