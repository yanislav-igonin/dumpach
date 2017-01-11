import React, {Component} from 'react';
import {Button} from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';

import Promise from 'bluebird';

export default class CreateThreadForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };


        this.handleToggle = this.handleToggle.bind(this);
        this.createThread = this.createThread.bind(this);

        this.actions = [
            {label: "Отмена", onClick: this.handleToggle}, 
            {label: "Создать тред", onClick: this.createThread}
        ];
    }

    handleToggle(){
        this.setState({active: !this.state.active});
    }

    createThread(){
        // let _request;

        // return new Promise((resolve, reject) => {

        //     _request.open("POST", "/threads", true);

        //     _request.onreadystatechange = () => {
        //         if (_request.readyState === 4 && _request.status === 200) {
        //             _threads = JSON.parse(_request.responseText);
        //             resolve(_threads);
        //         }
        //     }

        //     _request.send();

        // });

        this.handleToggle();
    }

    render() {
        return (
            <div className='create-thread-dialog-container' style={{margin: '3em 0 0 3em'}}>
                <Button label='Создать тред' onClick={this.handleToggle}/>
                <Dialog
                    className='create-thread-dialog'
                    actions={this.actions}
                    active={this.state.active}
                    onEscKeyDown={this.handleToggle}
                    onOverlayClick={this.handleToggle}
                    title='Создать тред'>
                    <Input type='text' multiline ref='newThreadOpPost' />

                </Dialog>
            </div>
        );
    }
}