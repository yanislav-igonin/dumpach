import React, {Component} from 'react';
import {Button} from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';

import Promise from 'bluebird';

export default class AnswerInThreadForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            answerTitle: '',
            answerText: ''
        };


        this.handleToggle = this.handleToggle.bind(this);
        this.handleAnswerTitleChange = this.handleAnswerTitleChange.bind(this);
        this.handleAnswerTextChange = this.handleAnswerTextChange.bind(this);
        // this.createThread = this.createThread.bind(this);

        this.actions = [
            {label: "Отмена", onClick: this.handleToggle}, 
            {label: "Ответить в тред", onClick: this.createThread}
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

    createThread(){
        
        // let _files = this.refs.newThreadOpPostFiles.files,
        //     _title = this.state.newThreadTitle,
        //     _text = this.state.newThreadText,
        //     _file,
        //     _this = this;
        //     // _newFilesNamesArray = this.state.filesNames;
        //     // _progressBar = document.querySelector('#file-upload-progress');

        //     debugger

        // if(_files.length > 0 || _text !== '') {
        //     let _request = new XMLHttpRequest(),
        //         _formData = new FormData();

        //     for (let fileIndex = 0; fileIndex < _files.length; fileIndex++) {
        //         _file = _files[fileIndex];

        //         _formData.append('uploads[]', _file, _file.name);
        //     }
            
        //     _formData.append('title', _title);
        //     _formData.append('text', _text);

        //     _request.upload.onprogress = (event) => {

        //         if (event.lengthComputable) {
        //             // _progressBar.style.width = parseInt(event.loaded * 100 / event.total) + '%';
        //         }

        //     };

        //     _request.open("POST", "/threads", true);
        //     _request.onreadystatechange = () => {
        //         if (_request.readyState === 4 && _request.status === 201) {
        //             this.openCreatedThread(JSON.parse(_request.responseText));
        //         }
        //     };
            
        //     _request.send(_formData);
        // }

        this.handleToggle();
    }

    render() {
        return (
            <div className='answer-thread-dialog-container' style={{margin: '3em 0 0 2%'}}>
                <Button label='Ответить в тред' onClick={this.handleToggle}/>
                <Dialog
                    className='answer-thread-dialog'
                    actions={this.actions}
                    active={this.state.active}
                    onEscKeyDown={this.handleToggle}
                    onOverlayClick={this.handleToggle}
                    title='Ответить в тред'>

                    <Input type='text' label='Введите тему' value={this.state.answerTitle} onChange={this.handleAnswerTitleChange}/>
                    <Input type='text' label='Введите текст' multiline rows={5} value={this.state.answerText} onChange={this.handleAnswerTextChange}/>
                    <input type='file' multiple ref='answerFiles' />

                </Dialog>
            </div>
        );
    }
}