import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "redux/actions/auth";
// import Button from "../SignUp/Button";
import "../SignUp/newcss.css";
import Logo from "../../assets/DashboardLogo.png";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "globalStyles/style";
import axios  from 'axios';

const Login = ({ login, isAuthenticated }) => {
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [navigate, setNavigate] = useState(false);
	const [isLoading, setisLoading] = useState(false)

 
  const submit = async e => {
    
    setisLoading(true)
    e.preventDefault();

    const { data } = await axios.post('https://aquiladev.azurewebsites.net/api/token/', {
      email, password
    });
    localStorage.setItem('user', JSON.stringify(data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;

    setNavigate(true);

  }
  if (navigate) {
    
    return <Redirect to="/first-login" />;
  }

  return (
    <div className="login-body">
      <div className="login-section">
        <div className="form-div">
          <img src={Logo} alt="aquila" />
          <p>Welcome Back</p>
          <form className="login-form" onSubmit={submit}>
            <input
              type="email"
              required
              value={email}
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="passInput"
              required
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />

            <Link
              to="/reset-password"
              style={{
                fontSize: "16px",
                textAlign: "right",
                color: "#335AA3",
                fontWeight: "600",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </Link>

            {/* <Button text="Sign in to Aquila"> */}

            {/* </Button> */}

            <Button
              mt="20px"
              w="100%"
              p="10px"
              bc="#5B5B5B"
              color="#EDEFF5"
              fs="18px"
              br="3px"
              mr="90px"
              type="submit"
            >
              {isLoading ? (
                <Backdrop open>
                  <CircularProgress color="inherit" />
                </Backdrop>
              ) : (
                "Sign in to Aquila"
              )}
              
            </Button>
            <Link
              to="sign-up"
              style={{
                fontSize: "16px",
                textAlign: "center",
                color: "#335AA3",
                fontWeight: "600",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              New Here, Let's get you Started
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);