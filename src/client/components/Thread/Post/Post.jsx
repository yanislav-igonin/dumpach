import React, {Component} from 'react';

import File from './File/File';

export default class Post extends Component {
    constructor(props) {
        super(props);
        
    }

    renderFiles(){
        if(this.props.post.files.length > 0){
            return this.props.post.files.map((file) => {
                return <File key={file} file={file} />
            });
        }
    }

    renderPostText(){
        let _paragraphs = this.props.post.text.split('\n');
            
        if(this.props.post.text !== ''){
            return _paragraphs.map((line, lineIndex) => {
                return (
                    <div key={lineIndex} className='post-text-container'>
                        <p className="post-text">{line}</p>
                    </div>
                )
            });
        }
    }

    render() {
        const {title, text, time, files} = this.props.post;
        const _time = new Date(time);

        return (
            <li className="posts-list-element">
                <div className="post-container">

                    <h3 className="post-title">{title}</h3>
                    {title !== '' ? <h3 className="post-title">&nbsp;</h3>: null}
                    <h3 className="post-title">
                        {_time.toLocaleDateString()} {_time.getHours()}:{_time.getMinutes()}:{_time.getSeconds()}
                    </h3>

                    <ul className='post-files-list'>
                        {this.renderFiles()}
                    </ul>

                    {this.renderPostText()}
                </div>
            </li>
        );
    }
}