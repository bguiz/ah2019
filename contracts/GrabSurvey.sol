pragma solidity ^0.5.0;

contract GrabSurvey {

    uint256 public numSurveys = 0;
    mapping(uint256 => string) public surveys;

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

}
