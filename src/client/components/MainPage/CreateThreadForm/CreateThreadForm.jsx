import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone';

export default class CreateThreadForm extends Component {
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

    renderDropzoneFilesPreview() {
        return this.state.files.map((file, fileIndex) => {
            return (
                <div>
                    suka
                </div>
            );
        });
    }

    renderDropzoneContent() {
        let _content = <i className="material-icons">attach_file</i>;

        if(this.state.files.length > 0){
            _content = this.renderDropzoneFilesPreview();
        }

        return _content;
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
                onTouchTap={this.toggleOpen}
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
                        floatingLabelText="Thread text"
                        value={this.state.text}
                        onChange={this.changeText}
                    />

                    <Dropzone
                        className="create-thread-form-dropzone"
                        accept={['image/*', 'video/*']}
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