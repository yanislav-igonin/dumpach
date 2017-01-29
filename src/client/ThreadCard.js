import React, {Component} from 'react';
import { browserHistory } from 'react-router'

import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';

export default class ThreadCard extends Component {
    constructor(props) {
        super(props);

        this.openThread = this.openThread.bind(this);
    }

    openThread(){
        browserHistory.push(`/threads/${this.props.thread._id}`)
    }

    renderCardMediaComponent(){
        let _renderedCardMediaComponent = null;

        if(this.props.thread.posts[0].files.length > 0){
            _renderedCardMediaComponent = <CardMedia className='thread-card-media' aspectRatio="wide" image={'/uploads/' + this.props.thread.posts[0].files[0]}/>;
        } else {
            _renderedCardMediaComponent = <CardMedia className='thread-card-media' aspectRatio="wide" image="http://newshahipack.com/data/frontImages/news/page_thumb/no-imager.jpg"/>;
        }

        return _renderedCardMediaComponent;
    }

    getCardStyles(){
        let _styles = {
            width: '46%',
            marginRight: '2%',
            marginBottom: 20,
            display: 'inline-block'
        };

        if(document.body.clientWidth < 1000){
            _styles = {
                width: '96%',
                marginRight: '2%',
                marginBottom: 20,
                display: 'inline-block'
            }
        }

        return _styles;
    }

    render() {
        return (
            <Card style={this.getCardStyles()}>
                {this.renderCardMediaComponent()}
                <CardTitle className='thread-card-title' style={{ maxHeight: '10%', wordWrap: 'break-word' }} title={this.props.thread.posts[0].title}/>
                <CardText className='thread-card-text' style={{ height: '33.5%', wordWrap: 'break-word', overflow: 'auto' }}>{this.props.thread.posts[0].text}</CardText>
                <CardActions>
                    <Button label="Открыть тред" onMouseUp={this.openThread}/>
                </CardActions>
            </Card>
        );
    }
}

