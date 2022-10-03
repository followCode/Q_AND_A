import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getQuestions, similarQuestions } from "../../redux/actionCreators/questions";
import Navbar from "../../components/Navbar";

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => ({
  getQuestions: (token, errorCallback, successCallback) => dispatch(getQuestions(token, errorCallback, successCallback)),
  similarQuestions: (token, questionText, errorCallback, successCallback) => dispatch(similarQuestions(token, questionText, errorCallback, successCallback)),
});

const QuestionItem = ({question}) => {

    return (
        <a href={"/question/"+question.id} className="text-decoration-none">
            <div className="card m-2">
                <div className="card-body">
                    <h5 className="card-title text-primary">{question.text}</h5>
                    <h6 className="card-subtitle mb-2 text-dark">from {question.user_name}</h6>
                </div>
            </div>
        </a>
    )
}

const QuestionsList = ({questions}) => {
    return (
        <div className="my-2">
            <h4 class="text-dark p-2">Questions from other users</h4>
            {questions.map(q => (<QuestionItem question={q}/>))}
        </div>
    )
}

const SimilarQuestions = ({questions}) => {
    return (
        <div>
            <h6>Similar Questions:</h6>
            <ul>
                {questions.map(q => <li><a href={"/question/"+q.id}>{q.text}</a></li>)}
            </ul>
        </div>
    )
}

const AskQuestion = ({user, similarQuestionApi}) => {

    const [questionError, setQuestionError] = useState("");
    const [similarQuestions, setSimilarQuestions] = useState([]);
    const [disableAddQuestion, setDisableAddQuestion] = useState(false);

    const collectSimilarQuestions = (questionText) => {
        /*
        1. Check if it starts with "what", "why", "how", "who", "where", "when", "is", "are"
        2. Needs to be at least 10 characters long
        3. Make API call to get similar questions
        */
        let questionStarters = ["what", "why", "how", "who", "where", "when", "is", "are"]
        let questionSeparated = questionText.toLowerCase().split(" ");
       
        if(!questionStarters.includes(questionSeparated[0])) {
            setQuestionError("Please start your question with 'What', 'How', 'Why', etc.");
            setSimilarQuestions([]);
        } else if(questionText.length < 10) {
            setQuestionError("Questions need to be at least 10 characters")
            setSimilarQuestions([]);
        } else {
            setQuestionError("")
            similarQuestionApi(user.token, questionText, setQuestionError, setSimilarQuestions);
        }
        
    }

    useEffect(() => {
        if(similarQuestions.length>0) {
            setDisableAddQuestion(true);
        } else {
            setDisableAddQuestion(false);
        }
      }, []);

    return (
        <div className="container d-flex flex-column my-2">
            <div>
                <h4 className="text-dark mt-2">Ask a question</h4>
            </div>
            <div className="my-2">
                <textarea className="form-control" onChange={e => collectSimilarQuestions(e.target.value)} placeholder="Start your question with 'What', 'How', 'Why', etc."/>
            </div>

            <div className="d-flex text-danger">
              {questionError}
            </div>
            <div className="d-flex text-danger" >
                {similarQuestions.length>1 && (
                    <SimilarQuestions questions={similarQuestions}/>
                )}
            </div>
            <div className="d-flex flex-row-reverse">
              <button className={disableAddQuestion?"btn btn-primary disabled": "btn btn-primary"}>Add Question</button>
            </div>
            <div className="mt-2 d-none">
                <h5>Similar Questions</h5>
            </div>
        </div>
    )
}

const Dashboard = ({user, getQuestions, similarQuestions}) => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions(user.token, setFormError, setQuestions)
  }, []);

  return (
    <div className="jumbotron-fluid">
        <Navbar />
        <div className="container d-flex justify-content-center">
            <div className="container-fluid d-flex flex-column">
                <div className="">
                    <AskQuestion user={user} similarQuestionApi={similarQuestions}/>
                </div>
                <div className="">
                    <QuestionsList questions={questions.slice(0, 10)} />
                </div>
            </div>
        </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
