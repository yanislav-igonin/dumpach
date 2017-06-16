import React from 'react';

import settingsActions from '../../../../actions/settingsActions';

export default class File extends React.Component{
    constructor(props){
        super(props);

        this.openFileView = this.openFileView.bind(this);
    }

    checkFileExtension(fileName){
        let _splittedFileName = fileName.split('.'),
            _fileType;

        if(IMAGES_EXTENSIONS.indexOf(_splittedFileName[_splittedFileName.length - 1]) !== -1){
            _fileType = 'image';
        }
        if(VIDEOS_EXTENSIONS.indexOf(_splittedFileName[_splittedFileName.length - 1]) !== -1){
            _fileType = 'video';
        }

        return _fileType;
    }

    openImageInNewTab(path){
        window.open(path);
    }

    openFileView(path){
        this.props.dispatch(settingsActions.filesViewUpdate(path));
    }

    render(){
        let _filesLocation = window.location.origin + '/uploads/',
            _thumbsLocation = window.location.origin + '/uploads_thumbs/',
            _fileType,
            _renderedElement = null,
            _file = this.props.file;
            
        _fileType = this.checkFileExtension(_file);

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

const IMAGES_EXTENSIONS = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'gif', 'GIF'];
const VIDEOS_EXTENSIONS = ['webm'];