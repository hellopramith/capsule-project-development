import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserInputSection from './components/UserInputSection';
import ChattingSection from './components/ChattingSection';
import {connect} from 'react-redux';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    screen: PropTypes.string,
  };

  constructor(props) {
    super(props)
    this.state = {
      username: localStorage.getItem('username') || '',
      screen: localStorage.getItem('screen') || '',
      currentUser: {},
      messages: []
    }
    this.onUserEntry = this.onUserEntry.bind(this)
  }

  onUserEntry(username) {
    this.props.dispatch({
      type: 'GET_USERNAME',
      username
    });
  }

  render() {
    const screen_ = this.props.screen || this.state.screen;
    const username_ = this.props.username || this.state.username;

    if(screen_ && username_){
      localStorage.setItem('username', username_);
      localStorage.setItem('screen', screen_);
    }

    if (screen_ === '') {
      return <UserInputSection onSubmit={this.onUserEntry} />
    }
    if (screen_ === 'ChattingSection') {
      return <ChattingSection username={username_} />
    }
  }
}

const mapStateToProps = (state) => ({
  screen: state.screen,
  username : state.username
});

export default connect(mapStateToProps) (App)
