import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Form, TextArea } from 'semantic-ui-react'
import { Comment, Header } from 'semantic-ui-react'
import { Popup } from 'semantic-ui-react'

import { addZero } from '../../../../helpers/postHelpers';

// import { postsActions } from '../../../actions/postsActions';
// import { settingsActions } from '../../../actions/settingsActions';

import './Post.scss';

class Post extends Component{

    constructor(props) {
        super(props);

        this.state = {
            replyForm: false,
            replyAuthor: '',
            replyText: ''
        };

        this.sendReply = this.sendReply.bind(this);
        this.changeReplyText = this.changeReplyText.bind(this);
        this.toggleReplyForm = this.toggleReplyForm.bind(this);
    }

    sendReply(){
        const {replyAuthor, replyText} = this.state;
        const { post } = this.props;
        const { posts } = this.props.posts;
        
        if(replyText !== ''){
            axios.post('/api/posts/' + post._id, {
                author: replyAuthor,
                text: replyText,
                time: Date.now(),
                replies: [],
                lastPostId: posts[posts.length - 1]._id
            })
            .then((response) => {
                this
                .props
                .dispatch(postsActions
                    .postsUpdate(response.data)
                );
                
                this.toggleReplyForm();
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            if(this.props.settings.errorMessage.opened === false){
                this
                .props
                .dispatch(settingsActions
                    .errorMessageOpen("Reply text can't be empty")
                );

                setTimeout(() => {
                    this
                    .props
                    .dispatch(settingsActions
                        .errorMessageClose()
                    );
                }, 5000);
            }
        }
    }

    toggleReplyForm(){
        this.setState({replyForm: !this.state.replyForm});
    }

    changeReplyText(event){
        this.setState({replyText: event.currentTarget.value});
    }

    renderPostText(text){
        return text
        .split('\n')
        .map((postText, postTextIndex) => {
            return (
                <Comment.Text 
                    className="post-text" 
                    key={postText + postTextIndex + Date.now()}
                >
                    {postText}
                </Comment.Text>
            );
        })
    }

    renderRepliesContainer(){
        const { repliesId } = this.props.post;

        if(repliesId !== undefined && repliesId.length > 0){
            return (
                <div className="replies-container">
                    <div className="replies-content">
                        <p className="replies-text">Replies:&nbsp;</p>
                        {this.renderRepliesIds()}
                    </div>
                </div>
            );
        }
    }

    renderRepliesIds(){
        const { repliesId } = this.props.post;
        let posts;

        if(this.props.posts.posts !== undefined){
            posts = this.props.posts.posts;
        } else {
            posts = this.props.posts;
        }
        
        if(repliesId !== undefined && repliesId.length > 0){
            return repliesId.map((replyId, replyIdIndex) => {
                return (
                    <Popup
                        trigger={
                            <div className="reply-id-container">
                                <a className="reply-id-link">
                                    {replyId}
                                </a>
                                {replyIdIndex !== repliesId.length - 1 
                                    ?<p className="reply-id-comma">
                                        ,&nbsp;
                                    </p>
                                    :null
                                }
                            </div>
                        }
                        hoverable
                        position='top left'
                        key={'popup' + replyId + replyIdIndex}
                        style={{maxWidth: '100%'}}
                    >
                        
                        <Comment.Group>
                            <Post 
                                post={posts[replyId]} 
                                posts={posts}
                                postIndex={replyIdIndex}
                                threadTitle=""
                                reply={false}
                                key={'reply' + replyId + replyIdIndex}
                            />
                        </Comment.Group>

                    </Popup>
                );
            });
        }
    }

    renderReplyForm(){
        if(this.state.replyForm === true && this.props.reply === true){
            return (
                <Form reply onSubmit={e =>e.preventDefault()}>
                    <Form.TextArea 
                        placeholder="Text" 
                        onChange={this.changeReplyText}
                    />
                    <Button 
                        content="Add Reply"
                        labelPosition="left" 
                        icon="edit"
                        primary 
                        onClick={event => this.sendReply(event)}
                    />
                </Form>
            );
        }
    }

    render(){
        const { post, reply, postIndex, threadTitle } = this.props,
            { time } = post,
            goodTime = new Date(time);
            
        return (
            <Comment className="post-container">
                <Comment.Content>
                    {postIndex === 0
                        ?<Comment.Author as="a">
                            {threadTitle}
                        </Comment.Author>
                        :null
                    }
                    
                    <Comment.Metadata className={threadTitle === '' ? 'meta-without-title' : ''}>
                        <div>#{post._id} {goodTime.toLocaleDateString()} {addZero(goodTime.getHours())}:{addZero(goodTime.getMinutes())}:{addZero(goodTime.getSeconds())}</div>
                    </Comment.Metadata>

                    <div className="post-text-container">
                        {this.renderPostText(post.text)}
                    </div>

                    {this.renderRepliesContainer()}

                    {reply === true
                        ?<Comment.Actions>
                            <Comment.Action onClick={this.toggleReplyForm}>Reply</Comment.Action>
                        </Comment.Actions>
                        :null
                    }

                    {this.renderReplyForm()}

                </Comment.Content>
            </Comment>
        );
    }
}

function mapStateToProps(state, ownProps){
    return state;
}

export default connect(mapStateToProps)(Post);