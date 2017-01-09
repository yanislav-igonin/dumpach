import React, { Component } from 'react';
import Promise from 'bluebird';

import ThreadCard from './ThreadCard';

export default class MainPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            threads: []
        };
    }

    
    componentWillMount() {
        this.getInitialThreads();
    }
    
    getInitialThreads(){
        let _this = this;

        this.getThreads().then((threads) => {
            _this.setState({ threads: threads });
            return false;
        });
    }

    getThreads(){
        let _request = new XMLHttpRequest(),
            _this = this,
            _threads = [];

        return new Promise((resolve, reject) => {

            _request.open("GET", "/threads", true);

            _request.onreadystatechange = () => {
                if (_request.readyState === 4 && _request.status === 200) {
                    console.log(_request.responseText);
                    _threads = JSON.parse(_request.responseText);
                    resolve(_threads);
                }
            }

            _request.send();

        });
    }

    renderThreads(){
        return this.state.threads.map((thread, threadIndex) => {
            return <ThreadCard key={threadIndex} thread={thread} />
        });
    }

    render(){
        return (
            <div className="dumpach-main-container">
                <ul className="dumpach-threads-list" style={{ marginTop: '3em' }}>
                    {this.renderThreads()}
                </ul>
            </div>
        );
    }
}