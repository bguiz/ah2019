pragma solidity = 0.5.0;

interface Survey {
	 function getTitle() external view returns(string memory);
}

/**
@notice THIS CONTRACT WILL ONLY BE DEPLOYED ONCE
@dev DEPLOY THIS ONCE AT THE START OF THE PROJECT

**/

contract SurveyTracker {
	/**
	@notice surveyList keeps track of all the keys for the survey
	@dev dont all directly, call the getter function. Private.
	
	**/
	uint256[] private surveyList;
	uint256[] private titleList;
	/**
	@notice surveyMap is the mapping of surveyKey to where the survey address resieds
	@dev also dont call directly
	
	**/
	mapping(uint256 => address) private surveyAddressMap;
	mapping(uint256 => string) private surveyTitleMap;
	constructor() public {}

	/**
	@notice SurveyTracker should be called to save the address of the new created survey contract
	@dev It will handle the IDing after survey is created
	**/
	function addSurvey(address _surveyAddress) external returns (bool success) {
		surveyAddressMap[surveyList.length] = _surveyAddress;
		surveyList.push(surveyList.length);
	}
	/**
	@notice Get a List of all SurveyIDs
	@dev call this
	**/
	function getSurveyIds() external view returns (uint256[] memory) {
		return surveyList;
	}
	/**
	@notice Get a particular survey address for a surveyId
	@dev call this
	
	**/
	function getSurveyAddressById(uint256 _surveyId) external view returns (address) {
		return surveyAddressMap[_surveyId];
	}
	/**
	@notice Get a particular survey title if you know the address
	@dev call this
	**/
	function getSurveyTitleByAddress(address _surveyAddress)external view returns (string memory) {
		Survey survey = Survey(_surveyAddress);
		return survey.getTitle();
	}
	/**
	@notice Get survey titleByid
	@dev Id runs from 0. Call it as a parms into this function. First we need to get survey Address
	**/
	function getSurveyTitleById(uint256 _surveyId) external view returns (string memory,address) {
		Survey survey = Survey(surveyAddressMap[_surveyId]);
		return (survey.getTitle(),surveyAddressMap[_surveyId]);
	}
	/**
	@notice Get the all Titles Immediately
	@dev
	**/
}	
