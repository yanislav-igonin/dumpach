import React, { Component } from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';

import File from './File.jsx';

export default class Post extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: []
        }
    }
            
    renderPostTitle(){
        let _postTime = new Date(parseInt(this.props.post.time)),
            _answerIcon = <FontIcon className='post-answer-icon' value='question_answer' 
                onClick={() => this.props.openAnswerForm(this.props.post.postNumeration)} 
            />,
            _postTitle = (
                <div>
                    <h2 className='post-date'>
                        {_postTime.toLocaleDateString()} {_postTime.toLocaleTimeString()} - #{this.props.postIndex} - {this.props.post.postNumeration}
                    </h2>
                    {_answerIcon}
                    <h2 className='post-title'>
                        {this.props.post.title}
                    </h2>
                </div>
            );

        if(this.props.post.title === ''){
            _postTitle = (
                <div>
                    <h2 className='post-date'>
                        {_postTime.toLocaleDateString()} {_postTime.toLocaleTimeString()} - #{this.props.postIndex} - {this.props.post.postNumeration}
                    </h2>
                    {_answerIcon}
                </div>
            )
        }

        return _postTitle;
    }

    renderFiles(){
        return this.props.post.files.map((file) => {
            return <File key={file} file={file} />
        });
    }

    renderPostText(){
        let _postText = null,
            _lines = this.props.post.text.split('\n');
            
        if(this.props.post.text !== ''){

            _postText = _lines.map((line, lineIndex) => {
                return (
                    <div key={lineIndex} className='post-text'>
                        {line}
                        <br/>
                    </div>
                )
            });
        }

        return _postText;
    }


    render(){
        
        return (
            <li className='dumpach-thread-post'>
                {this.renderPostTitle()}
                <ul className='post-files-list'>
                    {this.renderFiles()}
                </ul>
                <div className='post-text-container'>
                    {this.renderPostText()}
                </div>
            </li>
        )
    }
}

Post.propTypes = {
    post: React.PropTypes.object.isRequired,
    postIndex: React.PropTypes.number.isRequired,
}
