import React from 'react';

import './File.scss';

import {checkFileExtension} from '../../../../../helpers/filesHelpers';

export default class File extends React.Component{
    constructor(props){
        super(props);
    }

    openImageInNewTab(path){
        window.open(path);
    }

    playPauseVideo(event) {
        if(event.target.paused === false){
            event.target.pause();
        } else {
            event.target.play();
        }
    }

    render(){
        let _filesLocation = window.location.origin + '/uploads/',
            _thumbsLocation = window.location.origin + '/uploads_thumbs/',
            _fileType,
            _renderedElement = null,
            _file = this.props.file;
            
        _fileType = checkFileExtension(_file);

        switch(_fileType){
            case 'image':
                _renderedElement = (
                    <li className="files-list-element">
                        <div className="files-list-element-content">
                            <img 
                                className="files-list-element-image" 
                                src={_thumbsLocation + 'thumb_' + _file} 
                            onClick={() => this.openImageInNewTab(_filesLocation + _file)}
                            />
                        </div>
                    </li>
                )
                break;
            case 'video':
                _renderedElement = (
                    <li className="files-list-element">
                        <div className="files-list-element-content">
                            <video 
                                className="files-list-element-video" 
                                controls="controls"
                                onClick={this.playPauseVideo}
                                poster={_thumbsLocation + 'thumb_' + _file + '.png'}
                            >
                                <source src={_filesLocation + _file} />
                            </video>
                        </div>
                    </li>
                )
                break;
            default:
                _renderedElement = (
                    <li className="files-list-element">
                        <a href={_filesLocation + _file}>{_file}</a>
                    </li>
                )
                break;
        }
        
        return _renderedElement;
    }
}
