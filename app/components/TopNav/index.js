import React, {Component} from 'react';
import styles from './styles.css';
import Wrap from '../Wrap';
import A from '../A';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav_open: false
    };
  }
  toggleNav() {
    this.setState({nav_open: !this.state.nav_open});
  }
  render() {
    let button_class = '';
    let link_class = '';
    if (this.state.nav_open) {
      button_class = styles.topnav_button__active;
      link_class = styles.topnav_links__active;
    }
    return (
      <div className={styles.topnav}>
        <button className={`${styles.topnav_button} ${button_class}`} onClick={() => this.toggleNav()}>+</button>
        <div className={`${styles.topnav_links} ${link_class}`}>
          <A className={styles.topnav_link} to="/">Home</A>
          <A className={styles.topnav_link} to="/new">New Story</A>
        </div>
      </div>
    );
  }
}

export default TopNav;