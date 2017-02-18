import React from 'react';

export default class File extends React.Component{
    constructor(props){
        super(props);

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

    openImageInNewTab(event){
        window.open(event.target.src);
    }

    render(){
        let _filesLocation = window.location.origin + '/uploads/',
            _fileType,
            _renderedElement = null,
            _file = this.props.file;
            
        _fileType = this.checkFileExtension(_file)

        switch(_fileType){
            case 'image':
                _renderedElement = (
                    <li className="files-list-element">
                        <img className="files-list-element-image" src={_filesLocation + _file} onClick={this.openImageInNewTab}/>
                    </li>
                )
                break;
            case 'video':
                _renderedElement = (
                    <li className="files-list-element">
                        <video className="files-list-element-video" controls="controls" >
                            <source src={_filesLocation + _file} />
                        </video>
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
const VIDEOS_EXTENSIONS = ['mpeg', 'ogg', 'mkv', 'avi', 'webm', 'mov', 'MOV', 'mp4'];


                        // <img className="files-list-element-image" src="public/loading.gif" data-lazy={_filesLocation + _file} onClick={this.openImageInNewTab}/>
