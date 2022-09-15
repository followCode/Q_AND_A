import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signInUser } from "../../redux/actionCreators/user";
import "./loginPage.css";

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => ({
  signInUser: (credentials, errorCallback) => dispatch(signInUser(credentials, errorCallback)),
});

const LoginPage = ({user, signInUser}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = () => {
    let credentials = {
      username: username,
      password: password,
    };

    signInUser(credentials, setFormError);
  };

  useEffect(() => {
    if (user.token && user.token.length !== 0) {
      navigate('/');
    }
  }, [user.token]);

  return (
    <section className="jumbotron-fluid d-flex align-items-center loginContainer" style={{ backgroundImage: "url('./images/login.background.jpg')" }}>
      <div className="container d-flex justify-content-center">
        <div className="d-flex flex-column shadow-sm p-5 m-5 bg-body rounded">
          <div className="d-flex flex-column text-center">
            <h2 className="p-2">Aquora</h2>
            <div className="d-flex p-2">A place to share knowledge and better understand the world</div>
          </div>
          <div className="container d-flex flex-column">
            <div className="d-flex flex-column p-3 mx-auto">
              <div className="fw-bold form-label">
                Username
              </div>
              <div className="">
                <input type="text" className="form-control" onChange={e => setUsername(e.target.value)}/>
              </div>
            </div>
            <div className="d-flex flex-column p-3 mx-auto">
              <div className="fw-bold form-label">
                Password
              </div>
              <div className="">
                <input type="password" className="form-control" onChange={e => setPassword(e.target.value)}/>
              </div>
            </div>
            <div className="d-flex flex-column mx-auto">
              <div className="form-text text-danger">
                {formError}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center p-3">
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto p-1">
              <a href="/register">Don't have an account?</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
