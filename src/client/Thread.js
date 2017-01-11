import React, { Component } from 'react';
import Promise from 'bluebird';

export default class Thread extends Component {
    constructor(props){
        super(props);
    }


    render(){
        return (
            <p>{this.props.thread.posts[0].text}</p>
        )
    }
}