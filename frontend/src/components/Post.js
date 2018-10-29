import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  firstPost: {
    backgroundColor: theme.palette.primary.main
  },
  post: {
    marginBottom: 10
  },
  mediaContainer: {
    textAlign: 'center'
  },
  media: {
    maxWidth: '100%',
    maxHeight: 100,
    display: 'inline-block',
    width: 'auto'
  }
});

const cutThreadTitle = title => {
  if (title.length < 300) {
    return title;
  }

  return `${title.slice(0, 300)} ...`;
};

const renderAttchments = (post, boardId, classes) =>
  post.attachments.map(attachment => (
    <CardMedia
      className={classes.media}
      component="img"
      image={`/uploads/thumb/${boardId}/${post.thread_id}/${attachment.uuid}-${attachment.name}`}
      title={attachment.name}
      key={attachment.id}
    />
  ));

const Post = ({ classes, thread, post, indexInThread }) => (
  <Card
    className={indexInThread === 0 ? `${classes.firstPost} ${classes.post}` : classes.post}
  >
    <CardHeader
      action={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      title={cutThreadTitle(post.title)}
      subheader={`${new Date(post.created_at).toLocaleDateString()}
        ${new Date(post.created_at).toLocaleTimeString()}`}
    />
    {post.attachments.length > 0 ? (
      <div className={classes.mediaContainer}>
        {renderAttchments(post, thread.board_id, classes)}
      </div>
    ) : null}
    <CardContent>
      <Typography variant="subheading">{post.text}</Typography>
    </CardContent>
    {indexInThread === 0 ? (
      <CardHeader subheader={`Ramained posts: ${thread.remained_posts}`} />
    ) : null}
  </Card>
);

export default withStyles(styles)(Post);
