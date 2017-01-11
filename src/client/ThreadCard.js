import React, {Component} from 'react';

import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';

export default class ThreadCard extends Component {
    constructor(props) {
        super(props);

        this.openThread = this.openThread.bind(this);
    }

    openThread(){
        window.location.href = '/threads/' + this.props.thread._id;
    }

    renderCardMediaComponent(){
        let _renderedCardMediaComponent = null;

        if(this.props.thread.posts[0].files.length > 0){
            _renderedCardMediaComponent = <CardMedia aspectRatio="wide" image={this.props.thread.posts[0].files[0].name}/>;
        } else {
            _renderedCardMediaComponent = <CardMedia aspectRatio="wide" image="http://newshahipack.com/data/frontImages/news/page_thumb/no-imager.jpg"/>;
        }

        return _renderedCardMediaComponent;
    }

    render() {
        return (
            <Card style={{
                width: '340px',
                height: 600,
                marginRight: 20,
                marginBottom: 20,
                display: 'inline-block'
            }}>
                {this.renderCardMediaComponent()}
                <CardTitle style={{ height: 175 }} title={this.props.thread.posts[0].title}/>
                <CardText>{this.props.thread.posts[0].text}</CardText>
                <CardActions>
                    <Button label="Открыть тред" onMouseUp={this.openThread}/>
                </CardActions>
            </Card>
        );
    }
}