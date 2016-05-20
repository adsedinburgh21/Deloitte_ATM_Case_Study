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
    return withdraw % multiple == 0;
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
  * getAvailableNotes - checks what type of notes are available to be dispensed
  *
  * @param  {Object} notesContainer - Object of objects containing the count for each note
  * return {Array} - array with the value of the notes in the ATM eg. [10,50]
  */
  getAvailableNotes( notesContainer ){
    let atmStock = Object.keys(notesContainer).filter( function(note){
      if( notesContainer[note].count > 0){
        return note;
      }
    })
    if(atmStock.length === 0){
      atmStock.push("No available notes");
    }
    return atmStock;
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
    if(this.getSumCountNotes(notesContainer) >= parseInt(withdraw.value) ){
      for(  let i=0; i <= notesContainer[50].count; i++){
        for(  let j=0; j <= notesContainer[20].count; j++){
          for(  let k=0; k <= notesContainer[10].count; k++){
            if( i*50 + j*20 + k*10 === parseInt(withdraw.value) ){
              return true;
            };
          };
        };
      };
    };
    return false;
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

/*******************************************************************************
FROM THE TESTS IN utilsSpec.js THE BANK NOTES SEEM TO DISPENSE IN ORDER - THE ATM DISPENSES A 50, THEN A 20, THEN A 10 THEN LOOPS BACK THROUGH THIS ORDER. DOESNT SEEM OPTIMAL - EG. CONSIDER IF £60 WITHDRAW REQUEST AND NO £10s LEFT IN ATM: IT WOULD GIVE A 50 THEN COULDNT GIVE REMAINING 10 - BUT IF HADNT DIPSENSED A 50, IT COULD HAVE DIPSENSED 3 x 20s.
I have chosen to dispense a combination of notes that has at least 1 of every note type (50, 20, 10) whilst giving the least amount of small notes as possible. If a combination containing all 3 note types is not available then the ATM will dispense a combination that contains 2 note types, again giving the least amount of small notes as possible. Failing this, the final option is to dispense the combination that is made from only 1 note type.
I have added an exception to this rule when dispensing £50. A £50 withdraw request will dispense as a single £50 note as in line with the tests in utilsSpec.js. Also, I thought dispensing a single £50 note for this scenario may help to better manage the stock of notes in the ATM. However, should it be decided that this is not required (perhaps providing a smaller denomination of notes to the customer could increase customer satisfaction), then the if statement (lines 127-129) can be removed and a request to withdraw £50 would then subsequently return 2x£20 and 1x£10.
********************************************************************************/

  calculateCountNotes( withdraw, props ) {
    var possibleNoteCombinations = [];
    var i, j, k;
    for( i=0; i < (props.atmData.notesContainer[50].count + 1); i++){
      for( j=0; j < (props.atmData.notesContainer[20].count + 1); j++){
        for( k=0; k < (props.atmData.notesContainer[10].count + 1); k++){
          if( (i*50 + j*20 + k*10) === parseInt(withdraw) ){
            possibleNoteCombinations.push( 
              { 50: { count: i }, 20: { count: j }, 10: { count: k } }
            );
          };
        };
      };
    };
    var threeNoteCombinations = possibleNoteCombinations.filter(function(notesCombination){
      if( notesCombination[50].count > 0 && notesCombination[20].count > 0 && notesCombination[10].count > 0){
        return notesCombination;
      }
    });
    var twoNoteCombinations = possibleNoteCombinations.filter(function(notesCombination){
      if( (notesCombination[50].count > 0 && notesCombination[20].count > 0 && notesCombination[10].count === 0)
        || (notesCombination[50].count > 0 && notesCombination[10].count > 0 && notesCombination[20].count === 0)
        || (notesCombination[20].count > 0 && notesCombination[10].count > 0 && notesCombination[50].count === 0) 
        ){
        return notesCombination;
      }
    });

    if( (props.atmData.notesContainer[50].count > 0) && (withdraw/50 === 1) ){
      return {50:{count: 1}, 20:{count: 0}, 10:{count: 0} }
    }
    if( threeNoteCombinations.length > 0){
      var dispenseThreeTypes = _.sortBy(threeNoteCombinations, function(collectionOfNotes) {
        return [collectionOfNotes[50].count, collectionOfNotes[20].count, collectionOfNotes[10].count];
      });
      return dispenseThreeTypes[dispenseThreeTypes.length-1];
    }
    else if( twoNoteCombinations.length > 0){
      var dispenseTwoTypes = _.sortBy(twoNoteCombinations, function(combination){
        return [combination[50].count, combination[20].count, combination[10].count];
      });
      return dispenseTwoTypes[dispenseTwoTypes.length-1];

    }
    else{
      return possibleNoteCombinations[0];
    }
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
    const notes50Used = _.get( withdrawnNotes, '50', 0 );
    const notes20Used = _.get( withdrawnNotes, '20', 0 );
    const notes10Used = _.get( withdrawnNotes, '10', 0 );

    const notes50available = _.get( availableNotes, '50', 0 );
    const notes20available = _.get( availableNotes, '20', 0 );
    const notes10available = _.get( availableNotes, '10', 0 );

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
      notesAvailability: `Sorry, the only notes currenty available are £: ${validationObject.displayAvailableNotes}`,
      rangeError: 'Only withdraws between £300 and £10',
      amountError: `Sorry, but the availability is ${validationObject.totalMoney}`,
      balanceError: `Sorry, but your balance is ${validationObject.userMethod}`,
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
    return `${user.name}, your current balance account is ${user.accountBalance.toLocaleString('gbr-GBR', { style: 'currency', currency: 'GBP' })}`;
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
    if ( typeof withdrawnNotes['10'] === "undefined" ) {
      return;
    }
    let textResult = [];
    _.forOwn( withdrawnNotes, ( value, key ) => {
      textResult.push(`£${key} x ${value.count}`);
    });
    let result = textResult.join(", ");
    return result;
  }
};

module.exports = Utils;
