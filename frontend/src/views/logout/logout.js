import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actionCreators/user";

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => ({
    logoutUser: (successCallback) => dispatch(logoutUser(successCallback)),
});


const LogoutView = ({user, logoutUser}) => {
    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/')
    }
  
    useEffect(() => {
      logoutUser(navigateToHome)
    }, []);
  
    return (
      <></>
    );
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(LogoutView);