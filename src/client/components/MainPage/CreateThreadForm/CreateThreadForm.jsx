import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone';

export default class CreateThreadForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            open: false
        }

        this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleOpen() {
        this.setState({open: !this.state.open});
    };

    onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
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
                    />

                    <TextField
                        className="create-thread-form-dialog-textfield"
                        multiLine={true}
                        floatingLabelText="Thread text"
                    />

                    <Dropzone
                        className="create-thread-form-dropzone"
                        onDrop={this.onDrop}
                    >
                        <div className="dropzone-content">
                            <i className="material-icons">attach_file</i>
                        </div>
                    </Dropzone>

                </Dialog>
            </div>
        );
    }
}