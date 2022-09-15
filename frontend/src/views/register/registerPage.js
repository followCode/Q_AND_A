import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actionCreators/user";

const mapDispatchToProps = dispatch => ({
  registerUser: (credentials, errorCallback, successCallback) => dispatch(registerUser(credentials, errorCallback, successCallback)),
});

const Register = ({registerUser}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formError, setFormError] = useState("");

  const navigateToLogin = () => {
    navigate("/login");
  }

  const handleSubmit = () => {
    if(password!==repeatPassword){
      setFormError("Passwords do not match. Please ensure they match")
    } else {
      let credentials = {
        username: username,
        password: password,
        password2: repeatPassword,
      };

      registerUser(credentials, setFormError, navigateToLogin);
    }
  }

  return (
    <section className="jumbotron-fluid d-flex align-items-center loginContainer" style={{ backgroundImage: "url('./images/login.background.jpg')" }}>
      <div className="container d-flex justify-content-center">
        <div className="container d-flex flex-column shadow-sm p-5 bg-body rounded w-50">
          <div className="d-flex flex-column text-center">
            <h2 className="p-2">Aquora</h2>
            <div className="d-flex p-2 justify-content-center">Sign up for an account!</div>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex flex-column pt-3 mx-auto">
              <div className="fw-bold form-label">
                Username
              </div>
              <div className="">
                <input type="text" className="form-control" onChange={e => setUsername(e.target.value)}/>
              </div>
            </div>
            <div className="d-flex flex-column pt-3 mx-auto">
              <div className="fw-bold form-label">
                Password
              </div>
              <div className="">
                <input type="password" className="form-control" onChange={e => setPassword(e.target.value)}/>
              </div>
            </div>
            <div className="d-flex flex-column pt-3 mx-auto">
              <div className="fw-bold form-label">
                Repeat Password
              </div>
              <div className="">
                <input type="password" className="form-control" onChange={e => setRepeatPassword(e.target.value)}/>
              </div>
            </div>
            <div className="d-flex flex-column mx-auto">
              <div className="d-grid col-6 mx-auto form-text text-danger">
                {formError}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center pt-3">
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary" onClick={handleSubmit}>Register</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto p-1">
              <a href="/login">Have an account? Login!</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default connect(null, mapDispatchToProps)(Register);
