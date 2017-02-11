import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {Button} from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import Promise from 'bluebird';

export default class CreateThreadForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            newThreadTitle: '',
            newThreadText: '',
            newThreadFiles: [],
            uploadProgress: 0
        };


        this.handleToggle = this.handleToggle.bind(this);
        this.handleNewThreadTitleChange = this.handleNewThreadTitleChange.bind(this);
        this.handleNewThreadTextChange = this.handleNewThreadTextChange.bind(this);
        this.handleFilesDrop = this.handleFilesDrop.bind(this);
        this.createThread = this.createThread.bind(this);

        this.actions = [
            {label: "Отмена", onClick: this.handleToggle}, 
            {label: "Создать тред", onClick: this.createThread}
        ];
    }

    handleToggle(){
        this.setState({active: !this.state.active});
    }

    handleNewThreadTitleChange(value){
        this.setState({newThreadTitle: value});
    }

    handleNewThreadTextChange(value){
        this.setState({newThreadText: value});
    }

    handleFilesDrop(files){
        this.setState({newThreadFiles: files});
    }

    openCreatedThread(threadId){
        window.location.href = '/threads/' + threadId;
    }

    createThread(){
        
        let _files = this.state.newThreadFiles,
            _title = this.state.newThreadTitle,
            _text = this.state.newThreadText,
            _file;

        if(_files.length > 0 || _text !== '') {
            let _request = new XMLHttpRequest(),
                _formData = new FormData();

            for (let fileIndex = 0; fileIndex < _files.length; fileIndex++) {
                _file = _files[fileIndex];

                _formData.append('uploads[]', _file, _file.name);
            }
            
            _formData.append('title', _title);
            _formData.append('text', _text);
            _formData.append('time', Date.now());

            _request.upload.onprogress = (event) => {

                if (event.lengthComputable) {
                    this.setState({uploadProgress: parseInt(event.loaded * 100 / event.total)});
                }

            };

            _request.open("POST", "/api/threads", true);
            _request.onreadystatechange = () => {
                if (_request.readyState === 4 && _request.status === 201) {
                    this.openCreatedThread(JSON.parse(_request.responseText));
                }
            };
            
            _request.send(_formData);
        }

        this.handleToggle();
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
        return this.state.newThreadFiles.map((file) => {
            return (
                <li className='files-preview-list-element'>
                    <img key={file.name} width="50px" src={file.preview} /> 
                </li>
            );
        })
    }

    render() {
        return (
            <div className='create-thread-dialog-container' style={{margin: '3em 0 0 2%'}}>
                <Button label='Создать тред' onClick={this.handleToggle}/>
                <Dialog
                    className='create-thread-dialog'
                    actions={this.actions}
                    active={this.state.active}
                    onEscKeyDown={this.handleToggle}
                    onOverlayClick={this.handleToggle}
                    title='Создать тред'>

                    <ProgressBar type="linear" mode="determinate" value={this.state.uploadProgress} />

                    <Input type='text' label='Введите тему' value={this.state.newThreadTitle} onChange={this.handleNewThreadTitleChange}/>
                    <Input type='text' label='Введите текст' multiline rows={5} value={this.state.newThreadText} onChange={this.handleNewThreadTextChange}/>
                    <Dropzone style={this.getDropzoneStyle()} onDrop={this.handleFilesDrop} >
                        <i className="material-icons">attach_file</i>

                        {this.state.newThreadFiles.length > 0 ? 
                            <div>
                                <h2>Uploading {this.state.newThreadFiles.length} files...</h2>
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