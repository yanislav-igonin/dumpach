import React, {Component} from 'react';

export default class Post extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        debugger
        return (
            <li className="posts-list-element">
                <h3>{this.props.post.title}</h3>
                <p>{this.props.post.text}</p>
            </li>
        );
    }
}