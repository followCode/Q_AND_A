import { useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
        <h1>App Name</h1>
        <div>
          {"Hello" ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/protected">Protected Page</Link>
              <button >Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
