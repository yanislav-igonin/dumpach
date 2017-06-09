import React, {Component} from 'react';

class FilesView extends Component {
    constructor(props) {
        super(props);
        
    }

    getFilesViewContainerStyle() {
        if(this.props.filesView === true){
            return {
                display: 'block'
            };
        }
    }

    render() {
        return (
            <div className="files-view-container" style={this.getFilesViewContainerStyle()}>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return state.settings;
}

export default connect(mapStateToProps)(FilesView);