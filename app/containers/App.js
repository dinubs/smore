import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        <Helmet title={`s'more - A Desktop Medium Writer`} />
        {this.props.children}
      </div>
    );
  }
}
