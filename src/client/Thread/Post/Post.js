import React, { Component } from 'react';

import File from './File';

export default class Post extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: []
        }
    }

    getPostTitleStyles(){
        return(
            {
                textOverflow: 'elipsis',
                wordWrap: 'break-word'
            }
        )
    }
            
    renderPostTitle(){
        let _postTime = new Date(parseInt(this.props.post.time)),
            _postTitle = (
                <div>
                    <h2 className='post-title' style={this.getPostTitleStyles()}>{this.props.post.title}</h2>
                    <h2 className='post-title'>{_postTime.toLocaleDateString()} {_postTime.toLocaleTimeString()} - #{this.props.postIndex}</h2>
                </div>
            );

        if(this.props.post.title === ''){
            _postTitle = (
                <div>
                    <h2 className='post-title'>{_postTime.toLocaleDateString()} {_postTime.toLocaleTimeString()} - #{this.props.postIndex}</h2>
                </div>
            )
        }

        return _postTitle;
    }

    renderFiles(){
        return this.props.post.files.map((file) => {
            return <File key={file} file={file} />
        });
    }

    renderPostText(){
        let _postText = null,
            _lines = this.props.post.text.split('\n');
            
        if(this.props.post.text !== ''){

            _postText = _lines.map((line, lineIndex) => {
                return (
                    <div key={lineIndex} className='post-text'>
                        {line}
                        <br/>
                    </div>
                )
            });
        }

        return _postText;
    }


    render(){
        
        return (
            <li className='dumpach-thread-post'>
                {this.renderPostTitle()}
                <ul className='post-files-list'>
                    {this.renderFiles()}
                </ul>
                <div className='post-text-container'>
                    {this.renderPostText()}
                </div>
            </li>
        )
    }
}

