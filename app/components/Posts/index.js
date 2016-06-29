import React from 'react';
import Post from '../Post';
import ZeroState from '../ZeroState';
import A from '../A';
import H1 from '../H1';

const Posts = (props) => {
  console.log(props.posts);
  if (!props.posts || !props.posts.length) {
    return (
      <ZeroState>
        You don't have any stories yet, why not <A to='/new'>write one</A>?
      </ZeroState>
    );
  }
  let posts = props.posts.map((post) => {
    return <Post post={post} />
  });
  return (
    <div>
      <H1>Your Posts</H1>
      {posts}
    </div>
  );
}

export default Posts;