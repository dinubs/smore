import React from 'react';
import styles from './styles.css';

const Post = (props) => {
  let {post} = props;
  return (
    <a target='_blank' href={`https://www.medium.com/${post.creatorId}/${post.uniqueSlug}`} className={styles.post}>
      <h1 className={styles.post_header}>{post.title}</h1>
      {(() => {
        if (!post.virtuals.previewImage.imageId) return;
        return <img className={styles.post_image} src={`https://cdn-images-1.medium.com/max/412/${post.virtuals.previewImage.imageId}`} />
      })()}
      <p className={styles.post_snippet}>{post.virtuals.subtitle}</p>
    </a>
  );
}

export default Post;