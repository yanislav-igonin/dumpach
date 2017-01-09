import React, {Component} from 'react';
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';

export default class ThreadCard extends Component {
    constructor(props) {
        super(props);
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
                <CardMedia aspectRatio="wide" image={this.props.thread.posts[0].files[0].name}/>
                <CardTitle style={{ height: 175 }} title={this.props.thread.posts[0].title}/>
                <CardText>{this.props.thread.posts[0].text}</CardText>
                <CardActions>
                    <Button label="Открыть тред"/>
                </CardActions>
            </Card>
        );
    }
}