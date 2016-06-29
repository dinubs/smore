import React from 'react';
import styles from './styles.css';

const Select = (props) => <select className={styles.Select} onChange={props.onChange} {...props}></select>;

module.exports = Select;