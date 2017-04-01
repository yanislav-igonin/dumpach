import React, {Component} from 'react';
import {connect} from 'react-redux';
import Promise from 'bluebird';
import axios from 'axios';
import Masonry from 'react-masonry-component';

import {threadsActions} from '../../actions/threadsActions';

import CreateThreadForm from './CreateThreadForm/CreateThreadForm';
import ThreadCard from './ThreadCard/ThreadCard';

class MainPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getInitialThreads();
    }
    
    getInitialThreads() {
        this.getThreads()
            .then((threads) => {
                this.props.dispatch(threadsActions.threadsInit(threads));
            });
    }

    getThreads() {
        return new Promise((resolve, reject) => {
            axios.get('/api/threads')
                .then((response) =>{
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    renderThreads() {
        return this.props.threads.map((thread, threadIndex) => {
            return <ThreadCard key={thread + threadIndex} thread={thread} />;
        });
    }

    render() {
        return (
            <div className="main-container">
                <CreateThreadForm />

                <Masonry elementType={'ul'} className="threads-list" >
                    {this.renderThreads()}
                </Masonry>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return state.threads;
}

export default connect(mapStateToProps)(MainPage);

function compareThreadUpdateTime(a, b) {
    return b.updateTime - a.updateTime;
}
