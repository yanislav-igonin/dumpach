import React, {Component} from 'react';
import Promise from 'bluebird';
import Masonry from 'react-masonry-component';

export default class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            threads: []
        };
    }

    componentDidMount() {
        this.getInitialThreads();
    }

    getInitialThreads() {}

    getThreads() {}

    renderThreads() {}

    render() {
        return (
            <div className="dumpach-main-container">
                <Masonry elementType={'ul'} className="dumpach-threads-list" >
                    <li>dick</li>
                </Masonry>
            </div>
        );
    }
}

function compareThreadUpdateTime(a, b) {
    return b.updateTime - a.updateTime;
}
