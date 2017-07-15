import React, {Component} from 'react';
import {Link} from 'react-router';
import { Comment } from 'semantic-ui-react'

import File from '../../Thread/Post/File/File';

import { addZero } from '../../../../helpers/postsHelpers';

import './PostPreview.scss';

export default class PostPreview extends Component{

    constructor(props) {
        super(props);
        
    }

    renderPostFilesContainer(){
        if(this.props.post.files !== undefined && this.props.post.files.length > 0){
            return (
                <div className="post-files-container">
                    <ul className="post-files-list">
                        {this.renderPostFiles()}
                    </ul>
                </div>  
            );
        }
    }

    renderPostFiles(){
        return this
        .props
        .post
        .files
        .map((file, fileIndex) => {
            return <File file={file} key={file + fileIndex} />;
        });
    }

    renderPostText(text){
        return text
        .split('\n')
        .map((postText, postTextIndex) => {
            return (
                <Comment.Text 
                    className="post-text" 
                    key={postText + postTextIndex + Date.now()}
                >
                    {postText}
                </Comment.Text>
            );
        })
    }

    render(){
        const { post, postIndex, threadTitle } = this.props,
            { time } = post,
            goodTime = new Date(time);
            
        return (
            <Comment className="post-container">
                <Comment.Content>
                    {postIndex === 0
                        ?<p className="thread-title">
                            {threadTitle}
                        </p>
                        :null
                    }
                    
                    <Comment.Metadata className={threadTitle === '' ? 'meta-without-title' : ''}>
                        <div>#{post._id} {goodTime.toLocaleDateString()} {addZero(goodTime.getHours())}:{addZero(goodTime.getMinutes())}:{addZero(goodTime.getSeconds())}</div>
                    </Comment.Metadata>

                    {postIndex === 0
                        ?<Link 
                            className="open-thread-link"
                            to={'/threads/' + this.props.threadId}
                        >
                            Open
                        </Link>
                        :null
                    }

                    {this.renderPostFilesContainer()}

                    <div className="post-text-container">
                        {this.renderPostText(post.text)}
                    </div>

                </Comment.Content>
            </Comment>
        );
    }
}