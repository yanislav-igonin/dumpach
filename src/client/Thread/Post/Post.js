import React, { Component } from 'react';

export default class Post extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: []
        }
    }


    render(){
        return (
            <li className='dumpach-thread-post'>
                <h1 className='post-title'>{this.props.post.title}</h1>
                <p className='post-text'>{this.props.post.text}</p>
            </li>
        )
    }
}