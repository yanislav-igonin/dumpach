import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';

const styles = theme => ({
  post: {
    marginBottom: 10,
    margin: '0 10px'
  },
  firstPost: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 0,
    margin: '0 0 10px 0'
  },
  mediaContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  media: {
    maxWidth: '100%',
    maxHeight: 100,
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
  post.attachments.map((attachment, attachmentIndex) => (
    <Link
      to={`/uploads/source/${boardId}/${post.thread_id}/${attachment.uuid}-${
        attachment.name
      }`}
      target="blank"
      key={attachment.id}
      style={{
        marginRight: attachmentIndex !== post.attachments.length - 1 ? 1 : 'none'
      }}
    >
      <CardMedia
        className={classes.media}
        component="img"
        image={`/uploads/thumb/${boardId}/${post.thread_id}/${attachment.uuid}-${
          attachment.name
        }`}
        title={attachment.name}
      />
    </Link>
  ));

// TODO: add posts in thread numeration
const Post = ({ classes, thread, post, indexInThread, preview = false }) => (
  <Card
    className={
      indexInThread === 0 ? `${classes.post} ${classes.firstPost} ` : classes.post
    }
  >
    <CardHeader
      action={
        indexInThread === 0 && preview ? (
          <Link to={`/${thread.board_id}/${thread.id}`}>
            <IconButton>
              <PlayCircleFilled />
            </IconButton>
          </Link>
        ) : null
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
    {indexInThread === 0 && preview ? (
      <CardHeader subheader={`Ramained posts: ${thread.remained_posts}`} />
    ) : null}
  </Card>
);

export default withStyles(styles)(Post);
