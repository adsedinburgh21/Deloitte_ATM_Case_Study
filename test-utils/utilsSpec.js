// Utils spec file
import chai from 'chai';
const expect = chai.expect;
const Utils = require( '../src/utils/utils' );
import * as mockData from '../test-helpers/mockState';
import _ from 'lodash';
let stateLess;
let validationObject;
let screenMsg;
let activeState;
let notesContainer;

function getRandomValueToMock( array ) {
  const maximum = ( array.length - 1 );
  const randomValue = _.random( 0, maximum );

  return array[ randomValue ];
}

beforeEach(() => {
  stateLess = mockData.mockState();
  validationObject = mockData.mockValidationObject({});
  screenMsg = mockData.mockScreenMsg( stateLess );
  activeState = mockData.mockActiveState();
  notesContainer = activeState.atmData.notesContainer;
});

describe( 'Utils', () => {
  it( 'Is defined', () => {
    expect( Utils ).not.eq( undefined );
  });

  describe( 'Predefined methods', () => {
    describe( 'isMultipleOf', () => {
      it( 'is defined', () => {
        expect( Utils.isMultipleOf ).not.eq( undefined );
      });
      it( 'returns a Boolean', () => {
        expect( Utils.isMultipleOf()).to.be.a( 'Boolean' );
      });
      it( 'returns true if is multiple by 10', () => {
        const amount = 150;
        expect( Utils.isMultipleOf( amount, 10 )).to.eq( true );
      });
      it( 'returns false if not is multiple by 10', () => {
        const amount = 155;
        expect( Utils.isMultipleOf( amount, 10 )).to.eq( false );
      });
    });

    describe( 'isValueWithinRange', () => {
      it( 'is defined', () => {
        expect( Utils.isValueWithinRange ).not.eq( undefined );
      });
      it( 'checks that an amount is within a range', () => {
        const withdraw = 220;
        expect( Utils.isValueWithinRange( withdraw, stateLess.minWithdraw, stateLess.maxWithdraw ))
          .to.eq( true );
      });
      it( 'throws an error if the amount is bigger than 300', () => {
        const withdraw = 320;
        expect( Utils.isValueWithinRange( withdraw, stateLess.minWithdraw, stateLess.maxWithdraw ))
          .to.eq( false );
      });
      it( 'throws an error if the amount is smaller than 10', () => {
        const withdraw = 5;
        expect( Utils.isValueWithinRange( withdraw, stateLess.minWithdraw, stateLess.maxWithdraw ))
          .to.eq( false );
      });
    });

    describe( 'isAnyMoneyLeft', () => {
      it( 'is defined', () => {
        expect( Utils.isAnyMoneyLeft ).not.eq( undefined );
      });
      it( 'returns "true" if there is enough amount from the total', () => {
        stateLess.totalMoney = 300;
        const withdraw = 250;
        expect( Utils.isAnyMoneyLeft( stateLess.totalMoney, withdraw )).to.eq( true );
      });
      it( 'returns "false" if there is not enough amount from the total', () => {
        stateLess.totalMoney = 200;
        const withdraw = 250;
        expect( Utils.isAnyMoneyLeft( stateLess.totalMoney, withdraw )).to.eq( false );
      });
    });

    describe( 'getSumCountNotes', () => {
      it( 'is defined', () => {
        expect( Utils.getSumCountNotes ).not.eq( undefined );
      });
      it( 'returns a Number', () => {
        expect( Utils.getSumCountNotes( notesContainer )).to.be.a( 'Number' );
      });
      it( 'returns the sum of all the available notes', () => {
        expect( Utils.getSumCountNotes( notesContainer )).to.eq( 1100 );
      });
      it( 'returns the sum of all the available notes', () => {
        notesContainer[ '50' ].count = 0;
        expect( Utils.getSumCountNotes( notesContainer )).to.eq( 600 );
      });
    });

    describe( 'calculateCountNotes', () => {
      it( 'is defined', () => {
        expect( Utils.calculateCountNotes ).not.eq( undefined );
      });
      it( 'returns an object', () => {
        expect( Utils.calculateCountNotes( 50, activeState )).to.be.an( 'Object' );
      });
      it( 'returns an object with a property named "50"', () => {
        expect( Utils.calculateCountNotes( 50, activeState )).to.have.property( '50' )
          .that.is.an( 'Object' )
          .with.property( 'count' )
          .that.is.a( 'Number' );
      });
      it( 'returns an object with a property named "20"', () => {
        expect( Utils.calculateCountNotes( 20, activeState )).to.have.property( '20' )
          .that.is.an( 'Object' )
          .with.property( 'count' )
          .that.is.a( 'Number' );
      });
      it( 'returns an object with a property named "10"', () => {
        expect( Utils.calculateCountNotes( 10, activeState )).to.have.property( '10' )
          .that.is.an( 'Object' )
          .with.property( 'count' )
          .that.is.a( 'Number' );
      });
      it( 'gives one note of each when is possible, £50', () => {
        const withdraw = 50;
        const result = { 50: { count: 1 }, 20: { count: 0 }, 10: { count: 0 } };
        expect( Utils.calculateCountNotes( withdraw, activeState )).to.eql( result );
      });
      it( 'gives one note of each when is possible, £80', () => {
        const withdraw = 80;
        const result = { 50: { count: 1 }, 20: { count: 1 }, 10: { count: 1 } };
        expect( Utils.calculateCountNotes( withdraw, activeState )).to.eql( result );
      });
      it( 'gives one note of each when is possible, £170', () => {
        const withdraw = 170;
        const result = { 50: { count: 2 }, 20: { count: 2 }, 10: { count: 3 } };
        expect( Utils.calculateCountNotes( withdraw, activeState )).to.eql( result );
      });
      it( 'gives one note of each when is possible, £80', () => {
        notesContainer[ '50' ].count = 0;
        const withdraw = 80;
        const result = { 50: { count: 0 }, 20: { count: 3 }, 10: { count: 2 } };
        expect( Utils.calculateCountNotes( withdraw, activeState )).to.eql( result );
      });
      it( 'gives one note of each when is possible, £130', () => {
        notesContainer[ '20' ].count = 0;
        const withdraw = 130;
        const result = { 50: { count: 2 }, 20: { count: 0 }, 10: { count: 3 } };
        expect( Utils.calculateCountNotes( withdraw, activeState )).to.eql( result );
      });
    });

    describe( 'subtractCountFromTotal', () => {
      it( 'is defined', () => {
        expect( Utils.subtractCountFromTotal ).not.eq( undefined );
      });

      it( 'subtracts the total count used for that specific note. Withdraw £10', () => {
        const withdraw = Utils.calculateCountNotes( 10, activeState );
        const newNotesAmount = Utils.subtractCountFromTotal( withdraw, notesContainer );

        expect( newNotesAmount[ '10' ].count ).to.eql( 19 );
      });
      it( 'subtracts the total count used for that specific note. Withdraw £80', () => {
        const withdraw = Utils.calculateCountNotes( 80, activeState );
        const newNotesAmount = Utils.subtractCountFromTotal( withdraw, notesContainer );

        expect( newNotesAmount[ '50' ].count ).to.eq( 9 );
        expect( newNotesAmount[ '20' ].count ).to.eq( 19 );
        expect( newNotesAmount[ '10' ].count ).to.eq( 19 );
      });
      it( 'subtracts the total count used for that specific note. Withdraw £170', () => {
        const withdraw = Utils.calculateCountNotes( 170, activeState );
        const newNotesAmount = Utils.subtractCountFromTotal( withdraw, notesContainer );

        expect( newNotesAmount[ '50' ].count ).to.eq( 8 );
        expect( newNotesAmount[ '20' ].count ).to.eq( 18 );
        expect( newNotesAmount[ '10' ].count ).to.eq( 17 );
      });
      it( 'subtracts the total count used for that specific note. Withdraw £150', () => {
        notesContainer[ '50' ].count = 0;
        const withdraw = Utils.calculateCountNotes( 150, activeState );
        const newNotesAmount = Utils.subtractCountFromTotal( withdraw, notesContainer );

        expect( newNotesAmount[ '50' ].count ).to.eq( 0 );
        expect( newNotesAmount[ '20' ].count ).to.eq( 15 );
        expect( newNotesAmount[ '10' ].count ).to.eq( 15 );
      });
      it( 'subtracts the total count used for that specific note. Withdraw £180', () => {
        notesContainer[ '10' ].count = 0;
        const withdraw = Utils.calculateCountNotes( 180, activeState );
        const newNotesAmount = Utils.subtractCountFromTotal( withdraw, notesContainer );

        expect( newNotesAmount[ '50' ].count ).to.eq( 8 );
        expect( newNotesAmount[ '20' ].count ).to.eq( 16 );
        expect( newNotesAmount[ '10' ].count ).to.eq( 0 );
      });
    });

    describe( 'getValidationMessage', () => {
      it( 'is defined', () => {
        expect( Utils.getValidationMessage ).to.eq( 'undefined' );
      });
      it( 'returns a String', () => {
        const mockedValidation = getRandomValueToMock( validationObject );
        expect( Utils.getValidationMessage( mockedValidation )).to.be.a( 'String' );
      });
      it( 'returns a specific message depending on the validationObject passed', () => {
        const mockedValidation = getRandomValueToMock( validationObject );
        const message = Utils.getValidationMessage( mockedValidation );
        expect( Utils.getValidationMessage( mockedValidation )).to.eq( message );
      });
    });

    describe( 'getScreenMessage', () => {
      it( 'is defined', () => {
        expect( Utils.getScreenMessage ).not.eq( undefined );
      });
      it( 'returns a String', () => {
        const mockedPathname = getRandomValueToMock(['/', '/withdraws', '/balance']);
        activeState.location.pathname = mockedPathname;

        expect( Utils.getScreenMessage( activeState )).to.be.a( 'String' );
      });

      it( 'returns a specific message depending on the pathname passed', () => {
        const mockedPathname = getRandomValueToMock(['/', '/withdraw', '/balance']);
        const messageValue = screenMsg[ mockedPathname ];
        activeState.location.pathname = mockedPathname;

        expect( Utils.getScreenMessage( activeState )).to.eq( messageValue );
      });
    });
  });
});
