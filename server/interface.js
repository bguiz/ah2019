const abi = [
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    name: 'results',
    outputs: [
      {
        name: '_blank',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'numSurveys',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    name: 'surveys',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'surveyId',
        type: 'uint256',
      },
      {
        name: 'userId',
        type: 'string',
      },
      {
        name: 'answers',
        type: 'uint8[]',
      },
    ],
    name: 'answerSurvey',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'surveyId',
        type: 'uint256',
      },
      {
        name: 'numQuestions',
        type: 'uint8',
      },
    ],
    name: 'aggregateSurvey',
    outputs: [
      {
        name: '',
        type: 'uint256[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'ipfsHash',
        type: 'string',
      },
    ],
    name: 'addSurvey',
    outputs: [
      {
        name: 'surveyId',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'surveyId',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'ipfsHash',
        type: 'string',
      },
    ],
    name: 'SurveyAdded',
    type: 'event',
  },
]

module.exports = abi;
