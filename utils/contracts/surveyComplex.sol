pragma solidity = 0.5.0;

contract Survey {
    /**
    @notice Variables that store all the information regarding the survey
    @dev try not to call the variables directly. Instead, use the getter function
    **/

    /**
    @notice Basic information about the survey
    @dev Filled up when survey is created
    **/
    string public title;
    address public add;


    /**
    @notice Answer struct that represents one Answer
    @dev Dont pull this directly
    //@params text The answer itself
    @answerKey The answerKey to one answer
    **/
    struct Answer {
        string text;
        uint8 count;
        uint8 answerKey;
    }

    /**
    @notice Question struct
    @dev One question struct represents one question for the survey.
    **/
    struct Question {
        string text;
        // Maps keys to Answer struct... keys can only be 0 to 4
        mapping(uint8 => Answer) answers;
    }

    /**
    @notice Maps the questionKey to a Question struct STARTS FROM 0
    @dev Dont pull this directly, mappings are a headache. Instead use a getter function
    **/
    mapping(uint8 => Question) private Questions;
    uint8 public QuestionCount;
    uint8[] public results;

    /**
    @notice Constructor function
    @dev Initialize to add name of function and add questions and answers 
    **/
    constructor(string memory _title,bytes32[] memory questions) public {
        title = _title;
//      add = this;
        for(uint8 i=0;i<questions.length;i++) {
            createQuestion(i,bytes32ToString(questions[i]));
        }
    }
    /**
    @notice Add question function is called in the constructor
    @dev This is handled within the constructor, no need to call this function. This prevents individuals from adding
    questions after the survey is created since that doesnt make sense, thus set to private
    **/
    function createQuestion(uint8 _number,string memory _text) private returns (bool success) {
        Questions[_number].text = _text;
        
        return true;
    }
    function createAnswer(uint8 _questionKey,uint8 _answerKey,string calldata _text) external returns (bool success) {
        require(_answerKey < 4,"Key is 4 or higher");
        Questions[_questionKey].answers[_answerKey].text = _text;
        Questions[_questionKey].answers[_answerKey].count = 0;
        Questions[_questionKey].answers[_answerKey].answerKey = _answerKey;
        QuestionCount += 1;
    }
    function addAnswer(uint8 _questionKey,uint8[] calldata _answer) external returns (bool success) {
        require(_answer.length == 4);
        //lets get the question struct
        Question storage question = Questions[_questionKey];
        for(uint8 i = 0;i<_answer.length;i++) {
            //lets get the current answer
            question.answers[i].count += _answer[i];
            //adds the answer from the array eg [1 0 0 0]
        
        }
    }
    function getAnswerData() external returns (uint8[] memory) {
        //uint8[] memory results = new uint8[](QuestionCount*4);
        //iterates over each question
        for(uint8 i=0;i<QuestionCount;i++) {
            //iterates over each answercount
            for(uint8 j=0;j<4;j++){
                results.push(Questions[i].answers[j].count);
            }
            
        }
        return results;
    }

    function bytes32ToString(bytes32 x) public view returns (string memory) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (uint32 j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
}


    

}