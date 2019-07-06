pragma solidity ^0.5.0;

contract GrabSurvey {

    uint256 public numSurveys = 0;
    mapping(uint256 => string) public surveys;

    struct SurveyResult {
        // dumb compiler error!
        uint8 _blank;

        // key: question number, value: [number of As, number of Bs, number of Cs, number of Ds]
        mapping(uint8 => uint256[4]) answerCount;
    }

    mapping(uint256 => SurveyResult) public results;


    // allow querying of all surveys created to date
    event SurveyAdded (uint256 indexed surveyId, string ipfsHash);

    constructor() public {}

    function addSurvey(string memory ipfsHash)
        public
        returns(uint256 surveyId)
    {
        //TODO use struct/ bytes to represent IPFS hash in a
        // better bit-packed manner
        surveyId = ++numSurveys;
        surveys[surveyId] = ipfsHash;
        emit SurveyAdded(surveyId, ipfsHash);
    }

    function answerSurvey(
        uint256 surveyId,
        string memory userId,
        uint8[16] memory answers
    ) public {
        require(bytes(surveys[surveyId]).length > 0, "survey should exist");
        // SurveyResult storage result = ;
        for (uint8 i = 0; i < answers.length; ++i) {
            results[surveyId].answerCount[i][answers[i]] += 1;
        }
        // TODO use userId to ensure that they haven't submitted
        // more than once
    }

}
