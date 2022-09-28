import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const Home = ({user}) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (user.token && user.token.length !== 0) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [user.token]);

  return (
    <section>
      <h1>You are on home page!</h1>
    </section>
  );
};

export default connect(mapStateToProps, null)(Home);
