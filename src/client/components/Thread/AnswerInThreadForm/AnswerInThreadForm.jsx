import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import {threadActions} from '../../../actions/threadActions';

class AnswerInThreadForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            open: false,
            title: '',
            text: '',
            files: []
        }

        this.toggleOpen = this.toggleOpen.bind(this);

        this.changeTitle = this.changeTitle.bind(this);
        this.changeText = this.changeText.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.answerInThread = this.answerInThread.bind(this);
    }

    toggleOpen() {
        this.setState({open: !this.state.open});
    }

    changeTitle(event, value) {
        this.setState({title: value});
    }

    changeText(event, value) {
        this.setState({text: value});
    }

    onDrop(acceptedFiles, rejectedFiles) {
        this.setState({files: acceptedFiles});
    }

    answerInThread() {
        let _data = new FormData();
        _data.append('text', this.state.text);
        _data.append('title', this.state.title);
        this.state.files.map((file, fileIndex) => {
            _data.append('uploads[]', file, file.name);
        });

        let _config = {
            onUploadProgress(progressEvent) {
                console.log(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }
        };
        
        axios.post('/api/threads/' + this.props.threadId, _data, _config)
        .then((response) => {
            this.props.dispatch(threadActions.threadUpdate(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
    }

    renderDropzoneContent() {
        let _content = <i className="material-icons">attach_file</i>;

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

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.toggleOpen}
            />,
            <FlatButton
                label="Answer in thread"
                primary={true}
                onTouchTap={this.answerInThread}
            />,
        ];

        return (
            <div className="answer-in-thread-form-container">
                <FlatButton className="open-answer-in-thread-form-button"
                    label="Answer in thread" 
                    onTouchTap={this.toggleOpen} 
                />

                <Dialog
                    className="answer-in-thread-form-dialog"
                    title="Answer in thread"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.toggleOpen}
                >

                    <TextField
                        className="answer-in-thread-form-dialog-textfield"
                        floatingLabelText="Thread title"
                        value={this.state.title}
                        onChange={this.changeTitle}
                    />

                    <TextField
                        className="answer-in-thread-form-dialog-textfield"
                        multiLine={true}
                        floatingLabelText="Thread text"
                        value={this.state.text}
                        onChange={this.changeText}
                    />

                    <Dropzone
                        className="answer-in-thread-form-dropzone"
                        accept={'image/*, video/webm'}
                        onDrop={this.onDrop}
                    >
                        <div className="dropzone-content">
                            {this.renderDropzoneContent()}
                        </div>
                    </Dropzone>

                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return state.thread;
}

export default connect(mapStateToProps)(AnswerInThreadForm);