pragma solidity = 0.5.0;

contract Survey {
    string public surveyQuestions;
    string public title;

    constructor(string memory _title, string memory _questions) public {
        title = _title;
        surveyQuestions = _questions;
    }

    function getSurvey() public view returns(string memory) {
        return surveyQuestions;
    }
    function getTitle() external view returns(string memory) {
    	return title;
    }
}
