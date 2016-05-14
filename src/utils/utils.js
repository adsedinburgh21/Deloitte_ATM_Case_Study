// Utils for Atm parent component

import _ from 'lodash';

const Utils = {

  /**
   * isMultipleOf - checks the multiple of a number
   *
   * @param  {Number} withdraw - number to divide
   * @param  {Number} multiple - number which divides for
   * @return {Boolean}          -  true if is equals 0
   */
  isMultipleOf( withdraw, multiple ) {
    return withdraw % multiple !== 0;
  },

  /**
   * isValueWithinRange - checks if a number is within a range
   *
   * @param  {Number} withdraw    - number to check
   * @param  {Number} minWithdraw - minimum number within the range
   * @param  {Number} maxWithdraw - maximum number within the range
   * @return {Boolean}
   */
  isValueWithinRange( withdraw, minWithdraw, maxWithdraw ) {
    return _.inRange( withdraw, minWithdraw, ( maxWithdraw + 1 ));
  },

  /**
   * isAnyMoneyLeft - checks if an amount is bigger than another
   *
   * @param  {Number} totalMoney - Initial amount
   * @param  {Number} withdraw   - Amount to compare with
   * @return {Boolean} - Returns true if the initial amount is bigger
   * or equal than the amount compared
   */
  isAnyMoneyLeft( totalMoney, withdraw ) {
    return totalMoney >= withdraw;
  },

  getSumCountNotes( notesContainer ) {
    return _.reduce( notesContainer, ( result, value, key ) => {
      result += ( value.count * key );
      return result;
    }, 0 );
  },

  /** TODO Implement this method
   *
   * areAnyNotesLeft - Given a withdrawal amount and the notes available in the ATM machine,
   * check the availability of each note type that you intend to withdraw (you will also need to calculate this)
   * and subsequently check if the ATM machine can dispense these.
   *
   * @param  {Number} withdraw   - Amount to check
   * @param  {Object} notesContainer - Object of objects containing the count for each note
   * @return {Boolean} -
   *
   * This method is used inside getInvalidScenarios from the parent component,
   * so an error can be returned for the availability validation.
   *
   */
  areAnyNotesLeft( withdraw, notesContainer ) {
  },

  /** TODO Implement this method
   *
   * calculateCountNotes - Calculates the total count for each type of notes required for withdrawal.
   *
   * @param  {Number} withdraw   - Amount to calculate
   * @param  {Object} notesContainer - ATM notes container
   * @return {Object} - Object of objects containing the count for each note
   *
   * The failing tests from "./test-utils/utilsSpec.js" can give you an idea about
   * how you can develop this method. This application relies on the follow data structure:
   * { 50: { count: 0 }, ... } idem for the rest of notes.
   *
   * "./src/components/atm.js" is the parent component for this React app,
   * there you can understand more how this app works.
   */
  calculateCountNotes( withdraw, props ) {
  },

  /**
   * subtractCountFromTotal - subtracts the needed count of notes from the initial amount of notes
   *
   * @param  {Object} withdrawnNotes - Object of objects for the calculated amount of notes needed,
   *  is the object result from calculateCountNotes
   *
   * @param  {Object} availableNotes - Object of objects with the count of each note
   * @return {Object} - Object containing the new amount of each note
   */
  subtractCountFromTotal( withdrawnNotes, availableNotes ) {
    const notes50Used = _.get( withdrawnNotes, '50' );
    const notes20Used = _.get( withdrawnNotes, '20' );
    const notes10Used = _.get( withdrawnNotes, '10' );

    const notes50available = _.get( availableNotes, '50' );
    const notes20available = _.get( availableNotes, '20' );
    const notes10available = _.get( availableNotes, '10' );

    return {
      50: {
        count: notes50available.count - notes50Used.count
      },
      20: {
        count: notes20available.count - notes20Used.count
      },
      10: {
        count: notes10available.count - notes10Used.count
      }
    };
  },

  /**
   * getValidationMessage - Returns the validation message for each withdraw
   *
   * @param  {Object} validationObject - Object with the withdraw validation,
   * is the object result from isWithdrawValid
   *
   * @return {String} - Message that depends on the object passed
   */
  getValidationMessage( validationObject ) {
    const validationMsg = {
      notesError: 'There is only notes of £10, £20 and £50',
      notesAvailability: 'The only available notes at this time are  ',
      rangeError: 'Only withdraws between £300 and £10',
      amountError: `Sorry, but the availability is £${validationObject.totalMoney}`,
      balanceError: `Sorry, but your balance is £${validationObject.userMethod}`,
      withdrawError: 'You are not providing a valid withdraw',
      withdrawValidMsg: 'We are dealing with your request'
    };

    return validationMsg[ validationObject.message ];
  },

  /**
   * getScreenMessage - Returns a message for each screen
   *
   * @param  {Object} props - Global React props "location.pathname"
   * @return {String} - Message that depends on the url passed
   */
  getScreenMessage( props ) {
    const screenMsg = {
      '/': `Hello, ${props.atmData.user.name}, welcome to iDotBank`,
      '/withdraw': `${props.atmData.user.name}, do your withdraw`,
      '/balance': 'Balance screen'
    };

    return screenMsg[ props.location.pathname ];
  },

  /**
   * getBalanceMessage - Returns message with account balance screen
   *
   * @param  {Object} props - Global React props
   * @return {String} - User's account balance
   */
  getBalanceMessage( props ) {
    const { user } = props.atmData;
    return `${user.name}, your current balance account is £${user.accountBalance}`;
  },

  /**
   * getSuccessMessage - Returns message when a withdraw is completed
   *
   * @param  {Object} props - Global React props
   * @return {String} - Success message
   */
  getSuccessMessage( props ) {
    const { name } = props.atmData.user;
    return `${name}, don't forget to take your money!`;
  },

  /**
   * TODO Refactor this method
   *
   * This returns a poorly string, maybe it's because there are some tests missing?
   * Try to return something more meaningful, I was thinking about pictures of notes or ...
   *
   * displayWithdrawnCount - Displays the amount of notes used for withdrawal.
   *
   * @param  {Object} withdrawnNotes - Total count of notes needed
   * @return {String} - Notes values
   */
  displayWithdrawnCount( withdrawnNotes ) {
    if ( withdrawnNotes[ '10' ] === undefined ) {
      return;
    }
    let textResult = '';
    _.forOwn( withdrawnNotes, ( value, key ) => {
      textResult += `key=${key} value=${value.count}`;
    });
    return textResult;
  }
};

module.exports = Utils;
