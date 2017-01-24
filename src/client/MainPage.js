import React, { Component } from 'react';
import Promise from 'bluebird';

import CreateThreadForm from './CreateThreadForm';
import ThreadCard from './ThreadCard';

export default class MainPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            threads: []
        };
    }

    
    componentDidMount() {
        this.getInitialThreads();
    }
    
    getInitialThreads(){
        let _this = this;

        this.getThreads().then((threads) => {
            console.log(threads);
            _this.setState({ threads: threads });
            return false;
        });
    }

    getThreads(){
        let _request = new XMLHttpRequest(),
            _this = this,
            _threads = [];

        return new Promise((resolve, reject) => {

            _request.open("GET", "/api/threads", true);

            _request.onreadystatechange = () => {
                if (_request.readyState === 4 && _request.status === 200) {
                    _threads = JSON.parse(_request.responseText);
                    debugger
                    resolve(_threads.sort(compareThreadUpdateTime));
                }
            }

            _request.send();

        });
    }

    renderThreads(){
        return this.state.threads.map((thread) => {
            return <ThreadCard key={thread._id} thread={thread} />;
        });
    }

    render(){
        return (
            <div className="dumpach-main-container">
                <CreateThreadForm />
                <ul className="dumpach-threads-list" style={{ marginTop: '3em', paddingLeft: '2%' }}>
                    {this.renderThreads()}
                </ul>
            </div>
        );
    }
}

function compareThreadUpdateTime(a, b){
    return b.updateTime - a.updateTime;
}