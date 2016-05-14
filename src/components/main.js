// Main screen Component

import React, { Component, PropTypes } from 'react';
import NavigationBar from '../components/navigation';

export default class Main extends Component {

  static propTypes = {
    displayScreenMessage: PropTypes.func,
    atmData: PropTypes.object
  }

  componentWillMount() {
    this.props.displayScreenMessage( this.props );
  }

  render() {
    return (
      <div>
        <h2>{ this.props.atmData.messages.screen }</h2>
        <h4>Select your option</h4>

        <nav>
          <NavigationBar />
        </nav>

      </div>
    );
  }
}
