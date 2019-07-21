pragma solidity = 0.5.0;

contract Survey {
    string public title;

    /**
    @notice Stores data about one answer
    @dev This has information regarding the text of the answer and the count for that answer
    **/
    struct Answer {
        bytes32 text;
        uint256 count;
    }
    /**
    @notice Stores data about one question
    @dev Make sure you set the text of the question, then iterate over the anserkeys
    **/ 
    struct Question {
        bytes32 text;
        bytes32[] answerKeys;
        mapping(bytes32 => Answer) answerMap;
    }
    mapping(bytes32 => Question) questions;
    bytes32[] private questionIds;
    bytes32[] private questionArray;
    /**
    @notice Consturtor creates the survey 
    @dev Only Sets the title. So the iterator has to be set over web3
    **/
    constructor(string memory _title) public {
        title = _title;
    }
    /**
    @notice Creates and populates the Questions in this contract with the answer options
    @dev Each question ID is dereived from the SHA-3 hash of _q
    **/
    function createQuestion(bytes32 _question,bytes32[] calldata options) external {
        bytes32 questionId = keccak256(abi.encodePacked(_question));
        questionIds.push(questionId);
        questionArray.push(_question);
        questions[questionId].text = _question;
        for(uint i =0 ;i<options.length;i++) {
            bytes32 answerId = keccak256(abi.encodePacked(options[i]));
            questions[questionId].answerKeys.push(answerId);
            questions[questionId].answerMap[answerId].text = options[i];
            questions[questionId].answerMap[answerId].count = 0;
        }
    }
    /**
    @notice Answers the given question and with the given answer
    @dev This function first generate the appropriate key, and then gets the question struct
    **/ 
    function answerQuestion(bytes32 _question,bytes32 _answers) external returns (bool success){
        bytes32 questionid = keccak256(abi.encodePacked(_question));
        bytes32 answerId = keccak256(abi.encodePacked(_answers));
        questions[questionid].answerMap[answerId].count++;
        return true;
    }

    function getQuestionIds() public view returns(bytes32[] memory) {
        return questionIds;
    }
    function getQuestions() public view returns(bytes32[] memory) {
        return questionArray;
    }
    function getTitle() external view returns(string memory) {
        return title;
    }
}
