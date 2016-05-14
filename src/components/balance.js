// Balance screen Component

import React, { Component, PropTypes } from 'react';
import { Link } from 'common-accessible-components';

export default class Balance extends Component {

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
        <h4>{ this.props.atmData.messages.screen }</h4>
        <Link href="/#/">Back</Link>
        <p>{ this.props.atmData.messages.balance }</p>
      </div>
    );
  }
}
