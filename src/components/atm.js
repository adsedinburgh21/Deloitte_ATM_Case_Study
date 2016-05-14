// Component container

import React, { Component, PropTypes } from 'react';
require( 'react/lib/ReactWithAddons' );
import Utils from '../utils/utils';
import _ from 'lodash-fp';

// Top parent Component
export default class Atm extends Component {

  static propTypes = {
    children: PropTypes.any
  };

  constructor( properties ) {
    super( properties );

    // Global state
    this.state = {
      maxWithdraw: 300,
      minWithdraw: 10,
      user: {
        accountBalance: 485.22,
        name: 'John Toe'
      },
      showValidationMessage: false,
      validationObject: {},
      messages: {
        validation: '',
        screen: '',
        balance: '',
        success: ''
      },
      withdrawAmount: '',
      notesContainer: {
        50: {
          count: 10
        },
        20: {
          count: 20
        },
        10: {
          count: 20
        }
      },
      withdrawnNotes: Utils.displayWithdrawnCount({})
    };
  }

  /**
   * decrementBalance - Decrements user's balance
   *
   * @param  {Number} amount - Amount to withdraw
   * @return {Object} New Component's state
   */
  decrementBalance( amount ) {
    const amountToNumber = Number( amount );

    if ( typeof amountToNumber !== 'number' ) {
      return;
    }

    const newBalance = this.state.user.accountBalance - amountToNumber;
    const newState = React.addons.update( this.state, {
      user: {
        accountBalance: { $set: newBalance }
      },
      withdrawAmount: { $set: '' },
      showValidationMessage: { $set: true }
    });

    this.setState( newState );
  }

  /**
   * setWithdrawAmount - Sets the user's withdraw
   *
   * @param  {String} amount - User's input
   * @return {Object} New Component's state
   */
  setWithdrawAmount( amount ) {
    this.setState({
      withdrawAmount: amount
    });
  }

  /**
   * displayScreenMessage - Callback for displaying messages on the screen
   *
   * @param  {Object} props - Global state
   * @return {Object} - New Component's state
   */
  displayScreenMessage( props ) {
    const newState = React.addons.update( this.state, {
      messages: {
        screen: { $set: Utils.getScreenMessage( props ) },
        balance: { $set: Utils.getBalanceMessage( props ) }
      }
    });

    this.setState( newState );
  }

  /**
   * displayValidationMessage - Callback for displaying validation messages on the screen
   *
   * @param  {Object} props - Global state
   * @return {Object} - New Component's state
   */
  displayValidationMessage( validationObject ) {
    const newState = React.addons.update( this.state, {
      messages: {
        validation: { $set: Utils.getValidationMessage( validationObject ) },
        success: { $set: '' }
      },
      showValidationMessage: { $set: false },
      withdrawnNotes: { $set: Utils.displayWithdrawnCount({}) }
    });

    this.setState( newState );
  }

  /**
   * handleShowValidation - Callback for displaying validation messages on the screen
   *
   * @param  {Object} props - Global state
   * @return {Object} - New Component's state
   */
  handleShowValidation() {
    const newState = React.addons.update( this.state, {
      showValidationMessage: { $set: true }
    });
    this.setState( newState );
  }

  /**
   * displaySuccessMessage - Callback for displaying success messages on the screen
   * if the withdraw is valid
   *
   * @param  {Object} props - Global state
   * @return {Object} - New Component's state
   */
  displaySuccessMessage( props ) {
    const newState = React.addons.update( this.state, {
      messages: {
        success: { $set: Utils.getSuccessMessage( props ) },
        validation: { $set: '' }
      }
    });

    this.setState( newState );
  }

  /**
   * getInvalidScenarios - Gathers all the possible validation errors objects
   *
   * @param  {Number} amount - Amount to validate
   * @return {Array} - All possible invalid scenarios
   */
  getInvalidScenarios( amount ) {
    const { accountBalance } = this.state.user;
    const { minWithdraw, maxWithdraw, notesContainer } = this.state;
    const totalMoney = Utils.getSumCountNotes( notesContainer );

    return [
      {
        condition: _.isNaN( amount ),
        message: 'withdrawError'
      },
      {
        condition: !Utils.isMultipleOf( amount, 10 ),
        message: 'notesError'
      },
      {
        condition: !Utils.isValueWithinRange( amount, minWithdraw, maxWithdraw ),
        message: 'rangeError'
      },
      /**
       * TODO Uncomment the section below, to test your code,
       * The order of the conditions inside this array could change
       * to get the correct validation
       */
      // {
      //   condition: !Utils.areAnyNotesLeft( withdraw, notesContainer ),
      //   message: 'notesAvailability'
      // },
      {
        condition: !Utils.isAnyMoneyLeft( accountBalance, amount ),
        message: 'balanceError',
        userMethod: accountBalance
      },
      {
        condition: !Utils.isAnyMoneyLeft( totalMoney, amount ),
        message: 'amountError',
        totalMoney: totalMoney
      }
    ];
  }

  /**
   * isWithdrawValid - Determines if the withdraw is valid
   *
   * @param  {Number} amount - Amount to validate
   * @return {Object} - New Component's state
   */
  isWithdrawValid( withdraw ) {
    const amount = Number( withdraw );

    // Creates validation error object
    const getError = ( scenario ) => {
      if ( !scenario ) {
        return;
      }

      const { condition, ...other } = scenario;

      return {
        isValid: false,
        ...other
      };
    };

    // Determines the error message to display
    const errorMessage = _.flow(
      ::this.getInvalidScenarios,
      _.find( scenario => scenario.condition === true ),
      getError
    );

    // If there is no error message, return a success validation object
    const whichMessage = errorMessage( amount ) || {
      isValid: true,
      message: 'withdrawValidMsg'
    };

    const newState = {
      ...this.state,
      validationObject: whichMessage
    };

    this.setState( newState );
  }

  /**
   * calculateWithdrawnNotes - Calculates total amount of notes for that withdraw,
   * sets new amount of available notes
   *
   * @param  {Number} witdraw - Amount to validate
   * @param  {Object} props - Global state
   * @return {Object} - New Component's state
   */
  calculateWithdrawnNotes( withdraw, props ) {
    const withdrawnNotes = Utils.calculateCountNotes( withdraw, props );
    const availableNotes = props.atmData.notesContainer;

    const newCountNotes = Utils.subtractCountFromTotal( withdrawnNotes, availableNotes );
    const newBalance = Utils.getSumCountNotes( availableNotes ) - withdraw;

    const newState = React.addons.update( this.state, {
      totalMoney: { $set: newBalance },
      notesContainer: { $set: newCountNotes },
      withdrawnNotes: { $set: Utils.displayWithdrawnCount( withdrawnNotes ) }
    });

    this.setState( newState );
  }

  render() {
    return React.cloneElement(
      this.props.children,
      {
        atmData: this.state,
        decrementBalance: ::this.decrementBalance,
        setWithdrawAmount: ::this.setWithdrawAmount,
        displayScreenMessage: ::this.displayScreenMessage,
        displayValidationMessage: ::this.displayValidationMessage,
        handleShowValidation: ::this.handleShowValidation,
        displaySuccessMessage: ::this.displaySuccessMessage,
        isWithdrawValid: ::this.isWithdrawValid,
        calculateWithdrawnNotes: ::this.calculateWithdrawnNotes
      }
    );
  }
}
