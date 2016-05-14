// Withdraw screen Component

import React, { Component, PropTypes } from 'react';
import { Link, Button, InputWithLabel } from 'common-accessible-components';

export default class Withdraw extends Component {

  static propTypes = {
    displayScreenMessage: PropTypes.func,
    isWithdrawValid: PropTypes.func,
    decrementBalance: PropTypes.func,
    setWithdrawAmount: PropTypes.func,
    displayValidationMessage: PropTypes.func,
    handleShowValidation: PropTypes.func,
    displaySuccessMessage: PropTypes.func,
    calculateWithdrawnNotes: PropTypes.func,
    atmData: PropTypes.object
  };

  componentWillMount() {
    this.props.displayScreenMessage( this.props );
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.atmData.showValidationMessage ) {
      this.props.displayValidationMessage( nextProps.atmData.validationObject );
    }
  }

  // Handle when the submit event is fired
  handleSubmit( event ) {
    event.preventDefault();
    const amount = event.target.withdraw.value;

    if ( amount !== '' && this.props.atmData.validationObject.isValid ) {
      this.props.decrementBalance( amount );

      //  Time out that clears the validation message and displays the success messages
      //  and calculates the count of notes needed
      setTimeout(() => {
        this.props.displaySuccessMessage( this.props );
        this.props.calculateWithdrawnNotes( amount, this.props );
      }, 3000 );
    } else {
      this.props.handleShowValidation();
    }
  }

  // Handle when the change event is fired, on the input field
  handleChange( event ) {
    const amount = Number( event.target.value );

    if ( typeof amount !== 'number' ) {
      return;
    }
    this.props.setWithdrawAmount( amount );
  }

  // Handle when the keyup event is fired, on the input field
  handleKeyUp( event ) {
    const amount = Number( event.target.value );

    if ( typeof amount !== 'number' ) {
      return;
    }
    this.props.isWithdrawValid( amount );
  }

  render() {
    return (
      <div>
        <h4>{this.props.atmData.messages.screen}</h4>
        <Link href="/#/">Back</Link>
        <form onSubmit={::this.handleSubmit}>
          <InputWithLabel
              label="withdraw"
              name="withdraw"
              type="number"
              value={this.props.atmData.withdrawAmount}
              onChange={::this.handleChange}
              onKeyUp={::this.handleKeyUp}
          />
          <Button name="withdrawBtn" type="submit">Withdraw</Button>
        </form>

        <p>{this.props.atmData.messages.validation}</p>
        <p>{this.props.atmData.messages.success}</p>
        <p>{this.props.atmData.withdrawnNotes}</p>
      </div>
    );
  }
}
