import React, {Component} from 'react';
import { Comment } from 'semantic-ui-react';

import PostPreview from './PostPreview/PostPreview';

import './ThreadPreview.scss';

export default class ThreadPreview extends Component {
    constructor(props) {
        super(props);
        
    }

    renderPostsPreview() {
        const {posts, title, _id} = this.props.thread;
        
        if(posts.length > 0){
            return posts.map((post, postIndex) => {
                return (
                    <PostPreview
                        post={post}
                        postIndex={postIndex} 
                        threadTitle={postIndex === 0 ? title: ''}
                        threadId={this.props.thread._id}
                        key={'post' + post + postIndex}
                    />
                );
            });
        }
    }

    render() {
        return (
            <div className="thread-preview-container">
                <div className="thread-preview-content">
                    <Comment.Group>
                         {this.renderPostsPreview()}
                    </Comment.Group>

                    <hr />
                </div>
            </div>
        );
    }
}