import React from 'react';
import {Link} from 'react-router';
import styles from './styles.css';

const A = (props) => <Link className={styles.a} {...props} />;

export default A;