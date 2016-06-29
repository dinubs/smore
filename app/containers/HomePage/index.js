import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Home from '../../components/Home';
import * as UserActions from '../../actions/user';
import styles from './styles.css';
import Button from '../../components/Button';
import Posts from '../../components/Posts';
import getPosts from '../../utils/get_posts.js';
import VerticalAlign from '../../components/VerticalAlign';
import Wrap from '../../components/Wrap';
import TopNav from '../../components/TopNav';
import H1 from '../../components/H1';
import P from '../../components/P';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      posts: []
    }
  }
  componentDidMount() {
  }
  render() {
    console.log(this.props);
    if (JSON.stringify(this.props.user) === '{}') {
      return (
        <VerticalAlign>
        <Wrap>
          <H1 style={{textAlign: 'center'}}>Welcome!</H1>
          <P style={{textAlign: 'center'}}>sMedium is a desktop editor for Medium, though you know that already because you're seeing this screen.</P>
          <Button style={{margin: 'auto', marginTop: '15px'}} onClick={() => this.props.getFromMedium()}>Sign In w/ Medium</Button>
        </Wrap>
        </VerticalAlign>
      );
    }
    if (this.state.loading) getPosts(this.props.user.username, (data) => this.setState({loading: false, posts: data.payload.references.Post}));
    return (
      <Wrap>
        <TopNav />
        <Posts posts={this.state.posts} />
      </Wrap>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);