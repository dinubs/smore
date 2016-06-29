import React, {Component} from 'react';
import styles from './styles.css';

import Tags from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

export default class TagInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    }
  }
  handleChange(tags) {
    this.setState({tags})
  }
  render() {
    return (
      <div className={styles.tags}>
        <Tags 
          value={this.state.tags} 
          onChange={(tags) => this.handleChange(tags)}
          tagProps={{className: styles.tag}}
          inputProps={{className: styles.input}}
        />
      </div>
    );
  }
}