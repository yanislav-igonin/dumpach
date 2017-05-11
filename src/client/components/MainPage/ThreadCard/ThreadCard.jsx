import React, {Component} from 'react';
import { browserHistory } from 'react-router'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class ThreadCard extends Component {
    constructor(props) {
        super(props);

        this.openThread = this.openThread.bind(this);
    }

    componentDidMount() {
        
    }

    openThread(){
        console.log(this.props.thread._id);
        browserHistory.push('/threads/' + this.props.thread._id);
    }

    renderImage(){
        let _image = (
            <img className="thread-card-image" src="http://img.memecdn.com/catnip-mother-fucker_o_2772335.jpg" />
        ), _file = this.props.thread.posts[0].files[0];

        if(_file !== undefined){
            _image = (
                <img src={"uploads/" + _file} />
            );
        }

        return _image;
    }

    render() {
        return (
            <li className="threads-list-element">
                <Card>
                        
                    <CardMedia
                        overlay={
                            <CardTitle 
                                title={this.props.thread.posts[0].title} 
                                titleStyle={{wordWrap: 'break-word'}}
                            />
                        }
                    >
                        {this.renderImage()}
                    </CardMedia>

                     <CardText>
                        {this.props.thread.posts[0].text}
                    </CardText>

                    <CardActions>
                        <FlatButton 
                            label="Open thread" 
                            onTouchTap={this.openThread}
                            labelStyle={{color: '#000'}}
                        />
                    </CardActions>

                </Card>
            </li>
        );
    }
}
