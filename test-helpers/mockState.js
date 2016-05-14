// Mockup data file

module.exports = {
  mockState() {
    return {
      maxWithdraw: 300,
      minWithdraw: 0,
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
      withdrawnNotes: {}
    };
  },

  mockActiveState() {
    return {
      atmData: {
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
            count: 320
          },
          10: {
            count: 20
          }
        },
        withdrawnNotes: {}
      },
      location: {
        pathname: ''
      }
    };
  },

  mockValidationObject( validationObject ) {
    return [
      {
        isValid: false,
        message: 'withdrawError'
      },
      {
        isValid: false,
        message: 'notesError'
      },
      {
        isValid: false,
        message: 'rangeError'
      },
      {
        isValid: false,
        message: 'balanceError',
        userMethod: validationObject.accountBalance
      },
      {
        isValid: false,
        message: 'amountError',
        totalMoney: validationObject.totalMoney
      },
      {
        isValid: true,
        message: 'withdrawValidMsg'
      }
    ];
  },

  mockScreenMsg( props ) {
    return {
      '/': `Hello, ${props.user.name}, welcome to iDotBank`,
      '/withdraw': `${props.user.name}, do your withdraw`,
      '/balance': 'Balance screen'
    };
  }
};
