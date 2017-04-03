import React, {Component} from 'react';

export default class Post extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <li className="posts-list-element">
                <div className="post-container">
                    <h3>{this.props.post.title}</h3>
                    <p>{this.props.post.text}</p>
                </div>
            </li>
        );
    }
}