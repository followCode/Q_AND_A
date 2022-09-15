import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = () => {
    setFormError("Passwords don't match")
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
                <input type="text" className="form-control" onChange={setUsername}/>
              </div>
            </div>
            <div className="d-flex flex-column pt-3 mx-auto">
              <div className="fw-bold form-label">
                Password
              </div>
              <div className="">
                <input type="password" className="form-control" onChange={setPassword}/>
              </div>
            </div>
            <div className="d-flex flex-column pt-3 mx-auto">
              <div className="fw-bold form-label">
                Repeat Password
              </div>
              <div className="">
                <input type="password" className="form-control" onChange={setRepeatPassword}/>
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

export default Register;
