import React, {Component} from 'react';
import { browserHistory } from 'react-router'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class CreateThreadForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            open: false,
            createButtonDisabled: false,
            title: '',
            text: '',
            files: []
        }

        this.toggleOpen = this.toggleOpen.bind(this);

        this.changeTitle = this.changeTitle.bind(this);
        this.changeText = this.changeText.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.createThread = this.createThread.bind(this);
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

    createThread() {
        let _data = new FormData();
        const _this = this;

        if(this.state.text !== '' || this.state.files.length > 0){
            _data.append('text', this.state.text);
            _data.append('threadTitle', this.state.title);
            this.state.files.map((file, fileIndex) => {
                _data.append('uploads[]', file, file.name);
            });

            let _config = {
                onUploadProgress(progressEvent) {
                    console.log(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                    _this.props.changeRequestReadiness((progressEvent.loaded * 100) / progressEvent.total);
                }
            };
            axios.post('/api/threads', _data, _config)
            .then((response) => {
                this.goToThread(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    goToThread(threadId){
        browserHistory.push('/threads/' + threadId);
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
                label="Create thread"
                primary={true}
                onTouchTap={this.createThread}
                disabled={this.state.createButtonDisabled}
            />,
        ];

        return (
            <div className="create-thread-form-container">
                <FlatButton className="open-create-thread-form-button"
                    label="Create thread" 
                    onTouchTap={this.toggleOpen} 
                />

                <Dialog
                    className="create-thread-form-dialog"
                    title="Create thread"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.toggleOpen}
                    autoScrollBodyContent={true}
                >

                    <TextField
                        className="create-thread-form-dialog-textfield"
                        floatingLabelText="Thread title"
                        value={this.state.title}
                        onChange={this.changeTitle}
                    />

                    <TextField
                        className="create-thread-form-dialog-textfield"
                        multiLine={true}
                        floatingLabelText="Thread OP post"
                        value={this.state.text}
                        onChange={this.changeText}
                    />

                    <Dropzone
                        className="create-thread-form-dropzone"
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