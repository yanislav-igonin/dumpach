import React, { Component } from 'react';

import File from './File';

export default class Post extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: []
        }
    }

    renderFiles(){
        return this.props.post.files.map((file) => {
            return <File key={file} file={file} />
        });
    }


    render(){
        return (
            <li className='dumpach-thread-post'>
                <h1 className='post-title'>{this.props.post.title} - {this.props.postIndex}</h1>
                <ul className='post-files-list'>
                    {this.renderFiles()}
                </ul>
                <p className='post-text'>{this.props.post.text}</p>
            </li>
        )
    }
}