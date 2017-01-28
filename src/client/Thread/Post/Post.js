import React, { Component } from 'react';

import File from './File';

export default class Post extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: []
        }
    }

    renderPostTitle(){
        let _postTime = new Date(parseInt(this.props.post.time)),
            _postTitle = (
                <h1 className='post-title'>
                    {this.props.post.title} - {_postTime.toLocaleDateString()} {_postTime.toLocaleTimeString()} - #{this.props.postIndex} 
                </h1>
            );

        if(this.props.post.title === ''){
            _postTitle = (
                <h1 className='post-title'>
                    {_postTime.toLocaleDateString()} {_postTime.toLocaleTimeString()} - #{this.props.postIndex} 
                </h1>
            )
        }

        return _postTitle;
    }

    renderFiles(){
        return this.props.post.files.map((file) => {
            return <File key={file} file={file} />
        });
    }


    render(){
        
        return (
            <li className='dumpach-thread-post'>
                {this.renderPostTitle()}
                <ul className='post-files-list'>
                    {this.renderFiles()}
                </ul>
                <p className='post-text'>{this.props.post.text}</p>
            </li>
        )
    }
}