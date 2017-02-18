import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {Button} from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import Checkbox from 'react-toolbox/lib/checkbox';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import Promise from 'bluebird';

export default class AnswerInThreadForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            answerTitle: '',
            answerText: '',
            answerSage: false,
            answerFiles: [],
            uploadProgress: 0
        };


        this.handleToggle = this.handleToggle.bind(this);
        this.handleAnswerTitleChange = this.handleAnswerTitleChange.bind(this);
        this.handleAnswerTextChange = this.handleAnswerTextChange.bind(this);
        this.handleAnswerSageChange = this.handleAnswerSageChange.bind(this);
        this.handleFilesDrop = this.handleFilesDrop.bind(this);
        this.answerInThread = this.answerInThread.bind(this);

        this.actions = [
            {label: "Отмена", onClick: this.handleToggle}, 
            {label: "Ответить в тред", onClick: this.answerInThread}
        ];
    }

    handleToggle(){
        this.setState({active: !this.state.active});
    }

    handleAnswerTitleChange(value){
        this.setState({answerTitle: value});
    }

    handleAnswerTextChange(value){
        this.setState({answerText: value});
    }

    handleAnswerSageChange(value){
        this.setState({answerSage: value});
    }

    handleFilesDrop(files){
        this.setState({answerFiles: files});
    }

    answerInThread(){
        let _files = this.state.answerFiles,
            _title = this.state.answerTitle,
            _text = this.state.answerText,
            _sage = this.state.answerSage,
            _file,
            _this = this;

        if(_files.length > 0 || _text !== '') {
            for(let i = 0; i < 400; i++){
            let _request = new XMLHttpRequest(),
                _formData = new FormData();

            for (let fileIndex = 0; fileIndex < _files.length; fileIndex++) {
                _file = _files[fileIndex];

                _formData.append('uploads[]', _file, _file.name);
            }
            
            _formData.append('title', _title);
            _formData.append('text', _text);
            _formData.append('time', Date.now());
            _formData.append('sage', _sage);

            _request.upload.onprogress = (event) => {

                if (event.lengthComputable) {
                    this.setState({uploadProgress: parseInt(event.loaded * 100 / event.total)});
                }

            };

            _request.open("POST", "/api/threads/" + this.props.threadId, true);
            _request.onreadystatechange = () => {
                if (_request.readyState === 4 && _request.status === 201) {
                    _this.props.Thread.updatePosts(JSON.parse(_request.responseText));
                    // this.clearAllFields()
                    // this.handleToggle();
                }
            };
            
            _request.send(_formData);
            }
        }

    }

    clearAllFields(){
        this.setState({
            answerTitle: '',
            answerText: '',
            answerSage: false,
            answerFiles: [],
            uploadProgress: 0
        });
    }

    getDropzoneStyle(){
        return{
            width: '100%',
            borderWidth: 2,
            borderColor: 'rgb(102, 102, 102)',
            borderStyle: 'dashed',
            borderRadius: 5,
            textAlign: 'center',
            padding: '40px 0',
            position: 'relative'
        }
    }

    renderFilesPreview(){
        return this.state.answerFiles.map((file) => {
            return (
                <li className='files-preview-list-element'>
                    <img key={file.name} width="50px" src={file.preview} /> 
                </li>
            );
        })
    }

    render() {
        return (
            <div className='answer-thread-dialog-container' style={{margin: '1em 0 0 2%', display:'inline-block'}}>
                <Button label='Ответить в тред' onClick={this.handleToggle}/>
                <Dialog
                    className='answer-thread-dialog'
                    actions={this.actions}
                    active={this.state.active}
                    onEscKeyDown={this.handleToggle}
                    onOverlayClick={this.handleToggle}
                    title='Ответить в тред'>

                    <ProgressBar type="linear" mode="determinate" value={this.state.uploadProgress} />

                    <Input type='text' label='Введите тему' value={this.state.answerTitle} onChange={this.handleAnswerTitleChange}/>
                    <Input type='text' label='Введите текст' multiline rows={5} value={this.state.answerText} onChange={this.handleAnswerTextChange}/>
                    <Checkbox checked={this.state.answerSage} onChange={this.handleAnswerSageChange} label="Sage"/>
                    <Dropzone style={this.getDropzoneStyle()} onDrop={this.handleFilesDrop} >
                        <i className="material-icons">attach_file</i>

                        {this.state.answerFiles.length > 0 ? 
                            <div>
                                <h2>Uploading {this.state.answerFiles.length} files...</h2>
                                <ul className='files-preview-list'>
                                    {this.renderFilesPreview()}
                                </ul>
                            </div> : null}
                            
                    </Dropzone>


                </Dialog>
            </div>
        );
    }
}

AnswerInThreadForm.propTypes = {
    threadId: React.PropTypes.string.isRequired,
    updatePosts: React.PropTypes.func.isRequired
}
