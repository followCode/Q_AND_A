import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getQuestions } from "../../redux/actionCreators/questions";
import Navbar from "../../components/Navbar";

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => ({
  getQuestions: (token, errorCallback, successCallback) => dispatch(getQuestions(token, errorCallback, successCallback)),
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

const AskQuestion = ({user, similarQuestionApi}) => {

    return (
        <div className="container d-flex flex-column my-2">
            <div>
                <h4 className="text-dark mt-2">Ask a question</h4>
            </div>
            <div className="my-2">
                <textarea className="form-control" onChange={e => {}} placeholder="Start your question with 'What', 'How', 'Why', etc."/>
            </div>
            <div className="d-flex flex-row-reverse">
              <button className="btn btn-primary" >Add Question</button>
            </div>
            <div className="mt-2 d-none">
                <h5>Similar Questions</h5>
            </div>
        </div>
    )
}

const Dashboard = ({user, getQuestions}) => {
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
                    <AskQuestion user={user} similarQuestionApi={() => {}}/>
                </div>
                <div className="">
                    <QuestionsList questions={questions} />
                </div>
            </div>
        </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
