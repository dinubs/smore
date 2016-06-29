import React from 'react';

import styles from './styles.css';

const Button = (props) => {
  return (
    <div className={ styles.wrap } {...props}>
    </div>
  );
}

export default Button;