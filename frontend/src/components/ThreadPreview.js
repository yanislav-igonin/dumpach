import React from 'react';
import styled from 'styled-components';

import Post from './Post';

const ThreadPreviewContainer = styled.div`
  margin-bottom: 20px;
`;

const ThreadPreview = ({ thread }) => (
  <ThreadPreviewContainer>
    {thread.posts.map((post, index) => (
      <Post post={post} thread={thread} key={post.id} indexInThread={index} />
    ))}
  </ThreadPreviewContainer>
);

export default ThreadPreview;
