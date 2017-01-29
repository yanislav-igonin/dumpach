import React, { Component } from 'react';

export default class NotFoundPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="dumpach-not-found-page">
                <h1>Тред не найден!</h1>
            </div>
        );
    }
}