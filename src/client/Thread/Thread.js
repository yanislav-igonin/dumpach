import React, { Component } from 'react';
import Promise from 'bluebird';

import Post from './Post/Post';
import AnswerInThreadForm from './AnswerInThreadForm';

export default class Thread extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: []
        }

        this.updatePosts = this.updatePosts.bind(this);
    }

    
    componentWillMount() {
        this.getInitialPosts();
    }

    getInitialPosts(){
        this.getPosts().then((posts) => {
            this.setState({posts: posts});
        });
    }
    
    getPosts(){
        let _request = new XMLHttpRequest(),
            _this = this,
            _thread = {};

        return new Promise((resolve, reject) => {
            
            _request.open("GET", "/api/threads/" + _this.props.params.threadId, true);

            _request.onreadystatechange = () => {
                if (_request.readyState === 4 ) {
                    _thread = JSON.parse(_request.responseText);
                    resolve(_thread.posts);
                }
            }

            _request.send();
        });
    }

    updatePosts(posts){
        this.setState({posts: posts});
    }

    renderPosts(){
        return this.state.posts.map((post, postIndex) => {
            return (
                <Post key={postIndex} post={post} />
            )
        });
    }

    render(){
        return (
            <div className='dumpach-thread-container'>
                <AnswerInThreadForm threadId={this.props.params.threadId} updatePosts={this.updatePosts} Thread={this}/>
                <ul className='thread-posts-list'>
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}