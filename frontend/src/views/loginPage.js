import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./loginPage.css";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <section className="container-fluid loginContainer" style={{ backgroundImage: "url('./images/login.background.jpeg')" }}>
      {/* <form onSubmit={handleSubmit}>
        <h1>Login </h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Enter Username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter Password" />
        <button type="submit">Login</button>
      </form> */}

      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column shadow-sm p-3 m-5 bg-body rounded">
          <div className="d-flex flex-column text-center">
            <h2 className="">Aquora</h2>
            <div className="d-flex">A place to share knowledge and better understand the world</div>
          </div>
          <div className="d-flex flex-column ">
            <div className="d-flex flex-column p-2">
              <div className="fw-bold">
                Username
              </div>
              <div className="">
                <input type="text" />
              </div>
            </div>
            <div className="d-flex flex-column p-2">
              <div className="fw-bold">
                Password
              </div>
              <div className="">
                <input type="password" />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center p-2">
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
