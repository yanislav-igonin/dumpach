export const checkFileExtension = (fileName) => {
    let splittedFileName = fileName.split('.'),
        fileType;

    if(IMAGES_EXTENSIONS.indexOf(splittedFileName[splittedFileName.length - 1]) !== -1){
        fileType = 'image';
    }
    if(VIDEOS_EXTENSIONS.indexOf(splittedFileName[splittedFileName.length - 1]) !== -1){
        fileType = 'video';
    }

    return fileType;
}

const IMAGES_EXTENSIONS = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'gif', 'GIF'];
const VIDEOS_EXTENSIONS = ['webm'];