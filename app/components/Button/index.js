import React from 'react';

import styles from './styles.css';

function Button(props) {
  return (
    <button className={ styles.button } {...props}>
    </button>
  );
}

export default Button;
