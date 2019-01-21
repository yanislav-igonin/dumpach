import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Post from './Post';

const styles = () => ({
  threadPreviewContainer: {
    marginBottom: 20
  }
});

const ThreadPreview = ({ thread, classes }) => (
  <div className={classes.threadPreviewContainer}>
    {thread.posts.map((post, index) => (
      <Post post={post} thread={thread} key={post.id} indexInThread={index} preview={true} />
    ))}
  </div>
);

export default withStyles(styles)(ThreadPreview);
