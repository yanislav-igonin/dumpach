import React, {Component} from 'react';
import {browserHistory} from 'react-router'
import FlatButton from 'material-ui/FlatButton';

import File from './File/File';

export default class Post extends Component {
    constructor(props) {
        super(props);
        
        this.openThread = this.openThread.bind(this);
    }

    openThread() {
        browserHistory.push('/threads/' + this.props.threadId);
    }

    getPostTitleContainerStyle() {
        if(this.props.postIndex === 0){
            return {
                color: '#FFF'
            };
        }
    }

    getPostFilesListStyle() {
        if(this.props.post.text.length > 0){
            return {
                marginBottom: '1em'
            };
        }
    }

    getPostsListElementStyle() {
        if(this.props.postIndex === 0){
            return {
                backgroundColor: '#9E9E9E',
                boxShadow: 'none'
            };
        }
    }




    renderPostIndex() {
        let _postIndexElement = null;
        const {postIndex} = this.props;

        if(postIndex > 0){
            _postIndexElement = <h3 className="post-title post-index">&nbsp;&nbsp;&nbsp;#{postIndex + 1}</h3>;
        }

        return _postIndexElement;
    }

    renderOpenThreadButton() {
        if(this.props.postIndex === 0 && this.props.threadId !== undefined){
            return (
                <h3 
                    className="post-title post-open-thread-link"
                    onTouchTap={this.openThread}
                >
                    &nbsp;&nbsp;&nbsp;Open Thread
                </h3>
            );
        }
    }

    renderFiles() {
        if(this.props.post.files.length > 0){
            return this.props.post.files.map((file) => {
                return <File key={file} file={file} />
            });
        }
    }

    renderPostFilesList() {
        if(this.props.post.files.length > 0){
            return (
                <ul 
                    className='post-files-list'
                    style={this.getPostFilesListStyle()}
                >
                    {this.renderFiles()}
                </ul>
            );
        }
    }

    renderPostText() {
        const {postIndex} = this.props;
        let _paragraphs = this.props.post.text.split('\n'),
            _textStyle = null;

        if(postIndex === 0){
            _textStyle = {color: '#FFF'};
        }
            
        if(this.props.post.text !== ''){
            return _paragraphs.map((line, lineIndex) => {
                return (
                    <div key={lineIndex} className='post-text-container'>
                        <p className="post-text" style={_textStyle}>{line}</p>
                    </div>
                )
            });
        }
    }

    render() {
        const {title, text, time, files, postNumeration} = this.props.post,
            {postIndex} = this.props,
            _time = new Date(time);

        return (
            <li className="posts-list-element" style={this.getPostsListElementStyle()}>
                <div className="post-container">

                    <div className="post-title-container" style={this.getPostTitleContainerStyle()}>
                        <h3 className="post-title">{title}</h3>
                        {title !== '' ? <h3 className="post-title">&nbsp;</h3>: null}
                        <h3 className="post-title">
                            {_time.toLocaleDateString()} {_time.getHours()}:{_time.getMinutes()}:{_time.getSeconds()}
                        </h3>

                        {this.renderPostIndex()}

                        <h3 className="post-title">&nbsp;&nbsp;&nbsp;№{postNumeration}</h3>
                        
                        {this.renderOpenThreadButton()}
                    </div>

                    {this.renderPostFilesList()}

                    {this.renderPostText()}
                </div>
            </li>
        );
    }
}