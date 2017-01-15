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
            <div className='dumpach-thread-post'>
                <h1>{this.props.post.title}</h1>
                <p>{this.props.post.text}</p>
            </div>
        )
    }
}