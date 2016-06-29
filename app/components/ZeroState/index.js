import React from 'react';
import styles from './styles.css';

const ZeroState = (props) => {
  return (
    <div className={styles.zerostate}>
      <div className={styles.zerostate_header}>:(</div>
      {props.children}
    </div>
  )
}

export default ZeroState;