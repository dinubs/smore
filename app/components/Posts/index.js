import React from 'react';
import Post from '../Post';
import ZeroState from '../ZeroState';
import A from '../A';
import H1 from '../H1';

const Posts = (props) => {
  let posts_map = [];
  for (let key in props.posts) {
    console.log(key);
    posts_map.push(props.posts[key]);
  }
  if (!posts_map || !posts_map.length) {
    return (
      <ZeroState>
        You don't have any stories yet, why not <A to='/new'>write one</A>?
      </ZeroState>
    );
  }
  let posts = posts_map.map((post) => {
    console.log(post);
    return <Post post={post} />
  });
  return (
    <div>
      <H1 style={{marginTop: '50px'}}>Your Posts</H1>
      {posts}
    </div>
  );
}

export default Posts;