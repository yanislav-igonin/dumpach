import React, {Component} from 'react';
import {browserHistory} from 'react-router'
import FlatButton from 'material-ui/FlatButton';

import Post from '../../Thread/Post/Post';

export default class ThreadPreview extends Component {
    constructor(props) {
        super(props);

        this.openThread = this.openThread.bind(this);
    }

    openThread(){
        browserHistory.push('/threads/' + this.props.thread._id);
    }

    renderPosts() {
        const {posts} = this.props.thread;

        if(posts.length > 0){
            return posts.map((post, postIndex) => {
                return (
                    <Post 
                        key={post + postIndex}  
                        postIndex={postIndex}
                        post={post}
                    />
                );
            });
        }
    }

    render() {
        return (
            <li className="threads-list-element">

                <ul className="thread-posts-list">
                    {this.renderPosts()}
                </ul>
                
            </li>
        );
    }
}
