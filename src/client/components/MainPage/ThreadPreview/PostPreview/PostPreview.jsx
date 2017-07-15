import React, {Component} from 'react';
import {Link} from 'react-router';
import { Comment } from 'semantic-ui-react'

import { addZero } from '../../../../helpers/postsHelpers';

import '../../Thread/Post/Post.scss';

export default class PostPreview extends Component{

    constructor(props) {
        super(props);
        
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
                        ?<Comment.Author as="a">
                            {threadTitle}
                        </Comment.Author>
                        :null
                    }
                    
                    <Comment.Metadata className={threadTitle === '' ? 'meta-without-title' : ''}>
                        <div>#{post._id} {goodTime.toLocaleDateString()} {addZero(goodTime.getHours())}:{addZero(goodTime.getMinutes())}:{addZero(goodTime.getSeconds())}</div>
                    </Comment.Metadata>


                    {postIndex === 0
                        ?<Link to={'/threads/' + this.props.threadId}>
                            Open
                        </Link>
                        :null
                    }

                    <div className="post-text-container">
                        {this.renderPostText(post.text)}
                    </div>

                </Comment.Content>
            </Comment>
        );
    }
}