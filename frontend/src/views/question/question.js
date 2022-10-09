import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getQuestion, getComments, addComment } from "../../redux/actionCreators/questions";
import Navbar from "../../components/Navbar";

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => ({
  getQuestion: (token, id, errorCallback, successCallback) => dispatch(getQuestion(token, id, errorCallback, successCallback)),
  getComments: (token, id, errorCallback, successCallback) => dispatch(getComments(token, id, errorCallback, successCallback)),
  addComment: (token, comment, errorCallback, successCallback) => dispatch(addComment(token, comment, errorCallback, successCallback)),
});

const QuestionSection = ({question}) => {

    return (
        <div className="m-2">
            <div className="d-flex flex-column">
                <p className="fs-4 mb-2 text-dark">{question.user_name} asks,</p>
                <p className="fs-1 text-primary">{question.text}</p>
            </div>
        </div>
    )
}

const CommentItem = ({comment}) => {
    return (
        <div className="card m-2">
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">{comment.user_name}</h6>
                <h5 className="card-title text-dark">{comment.text}</h5>
            </div>
        </div>
    )
}

const CommentsList = ({comments}) => {
    return (
        <div className="my-2">
            {comments.map(c => (<CommentItem comment={c}/>))}
        </div>
    )
}


const AddComment = ({user, question_id, addCommentApi}) => {

    const [commentError, setCommentError] = useState("");
    const [disableAddComment, setDisableAddComment] = useState(true);
    const [newComment, setNewComment] = useState("");

    const checkComment = (commentText) => {
       
        if(commentText.length < 50) {
            setCommentError("Comments need to be at least 50 characters")
            setDisableAddComment(true);
        } else {
            setCommentError("");
            setDisableAddComment(false);
            setNewComment(commentText);
        }
        
    }

    const reloadPage = (_) => {
        window.location.reload()
    }

    const handleAddComment = () => {

        let comment = {
            question: question_id,
            text: newComment,
        }
        addCommentApi(user.token, comment, setCommentError, reloadPage)
    }

    return (
        <div className="container d-flex flex-column my-2">
            <div className="my-2">
                <textarea className="form-control" onChange={e => checkComment(e.target.value)} placeholder="Write your answer."/>
            </div>

            <div className="d-flex text-danger">
              {commentError}
            </div>
            <div className="d-flex flex-row-reverse">
              <button className={disableAddComment?"btn btn-primary disabled": "btn btn-primary"} onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    )
}

const QuestionView = ({user, getQuestion, getComments, addComment}) => {
  const { id } = useParams();
  const [formError, setFormError] = useState("");
  const [question, setQuestion] = useState({ text: "Placeholder question here" });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getQuestion(user.token, id, setFormError, setQuestion)
    getComments(user.token, id, setFormError, setComments)
  }, []);

  return (
    <div className="jumbotron-fluid">
        <Navbar />
        <div className="container d-flex justify-content-center">
            <div className="container-fluid d-flex flex-column">
                <div className="main-question">
                    <QuestionSection question={question} />
                </div>
                <div className="">
                    <AddComment user={user} question_id={id} addCommentApi={addComment}/>
                </div>
                <div className="">
                    <CommentsList comments={comments}/>
                </div>
            </div>
        </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);
