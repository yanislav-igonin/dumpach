import React, { Component } from 'react';
import Promise from 'bluebird';
import { browserHistory } from 'react-router'

import { Button } from 'react-toolbox/lib/button';
import { AppBar } from 'react-toolbox';
import { Layout, NavDrawer, Panel } from 'react-toolbox';

import Post from './Post/Post.jsx';
import AnswerInThreadForm from './AnswerInThreadForm.jsx';

export default class Thread extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: [],
            drawerActive: false
        }

        this.getInitialPosts = this.getInitialPosts.bind(this);
        this.refreshPosts = this.refreshPosts.bind(this);
        this.toggleDrawerActive = this.toggleDrawerActive.bind(this);
        this.goToMainPage = this.goToMainPage.bind(this);
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
                if(_request.status === 404){

                }
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

    refreshPosts(){
        this.getInitialPosts()
    }

    goToMainPage(){
        browserHistory.push('/');
    }

    toggleDrawerActive(){
        this.setState({ drawerActive: !this.state.drawerActive });
    };

    scrollToTop(){
        document.getElementsByClassName('dumpach-thread-container')[0].scrollTop = 0;
    }

    renderPosts(){
        return this.state.posts.map((post, postIndex) => {
            return (
                <Post key={new Date().getTime() + post.time + post.text + postIndex} post={post} postIndex={postIndex} />
            )
        });
    }

    render(){
        return (
            <Layout>
                
                <NavDrawer active={this.state.drawerActive}
                    className='thread-nav-drawer-content'
                    onOverlayClick={ this.toggleDrawerActive }>
                    
                    <Button style={{margin: '10px'}} label='На главную' onClick={this.goToMainPage}/>

                </NavDrawer>

                <Panel>
                    <AppBar leftIcon='menu' rightIcon='arrow_upward' onLeftIconClick={ this.toggleDrawerActive } onRightIconClick={this.scrollToTop}/>

                    <div  style={{ flex: 1, overflowY: 'auto' }} className='dumpach-thread-container'>
                        <AnswerInThreadForm threadId={this.props.params.threadId} updatePosts={this.updatePosts} Thread={this}/>
                        
                        <ul className='thread-posts-list'>
                            {this.renderPosts()}
                        </ul>
                                    
                        <div style={{margin: '1em 0 0 2%'}}>
                            <Button style={{marginBottom: '10px', display:'inline-block'}} label='Обновить тред' onClick={this.refreshPosts}/>
                            <AnswerInThreadForm threadId={this.props.params.threadId} updatePosts={this.updatePosts} Thread={this}/>
                        </div>
                    </div>
                </Panel>

            </Layout>
        )
    }
}

Thread.propTypes = {
    params: React.PropTypes.object.isRequired
}
