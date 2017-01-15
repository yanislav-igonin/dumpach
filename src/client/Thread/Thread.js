import React, { Component } from 'react';
import Promise from 'bluebird';

export default class Thread extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: []
        }
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
            
            _request.open("GET", "/threads/" + _this.props.params.threadId, true);

            _request.onreadystatechange = () => {
                if (_request.readyState === 4 ) {
                    _thread = JSON.parse(_request.responseText);
                    resolve(_thread.posts);
                }
            }

            _request.send();
        });
    }

    renderPosts(){
            debugger
        return this.state.posts.map((post, postIndex) => {
            return (
                <div key={postIndex}>
                    <p>{post.text}</p>
                </div>
            )
        });
    }

    render(){
        return (
            <div className='dumpach-thread-container'>
                {this.renderPosts()}
            </div>
        )
    }
}