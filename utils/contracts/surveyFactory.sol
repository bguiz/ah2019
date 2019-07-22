pragma solidity = 0.5.0;

import './survey.sol';
contract SurveyFactory {

    address[] public surveyList;
    address public Owner;

    constructor() public {
        Owner = msg.sender;
    }

    function createSurvey(string memory _title,string memory _questions) public returns(address surveyAddress){
        Survey survey = new Survey(_title,_questions);
        surveyList.push(address(survey));
        return address(survey);
    }

    function getSurveyCount() public view returns(uint) {
        return surveyList.length;
    }
    function getSurveys() public view returns(address[] memory) {
        return surveyList;

    }
}