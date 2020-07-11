import React, { useState } from "react";
import {
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import axios from 'axios';
// import logoImg from "../img/logo.jpg";
import { useAuth } from "../context/auth";
import './css/login.css';
// import Auth from "./auth";
// import { login } from './UserFunctions'

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  // let history = useHistory();
  // let location = useLocation();

  // let { from } = location.state || { from: { pathname: "/" } };


  let login = () => {
    //mock
    const user = {
      //email, 
      username: 'jame',
      password: 'password'
    }
    setAuthTokens(user)
    setLoggedIn(true)
  };

  //const referer = props.location.state.referer || '/';

  if (isLoggedIn) {
    return <Redirect to={"/"} />;
  }

  function postLogin() { // connect backend
    axios.post("http://watthomeapi.jp.ngrok.io/auth", {
      username,
      password
    }).then(result => {
      if (result.status === 200) {
        // const res = result.data
        
        setAuthTokens(result.data);
        setLoggedIn(true);
        console.log(result.data)
        // console.log(result.status === 200)
      } else {
        setIsError(true);
        
      }
    }).catch(e => {
      setIsError(true);
      alert("username or password not true")
    });

    if (isLoggedIn == true) {
      return <Redirect to="/dashboard" />;
    } else {
      return <Redirect to="/signin" />;
    }
  }

  return (
    <div className="container">
      <div className="box-login">
        <div className="login-form">
          <form noValidate onSubmit={e => {
            e.preventDefault()
            // const user = {
            //   username: username,
            //   password: password
            // }
            // console.log("login pass")

            // login()
            postLogin()

          }}>
            <h1 className="Login-tittle">Please Sign In</h1>
            <div className="form-group-username">
              <label className="username-label" htmlFor="email">Username</label>
              <input type="email"
                className="form-input-username"
                name="email"
                placeholder="Enter Email"
                value={username}
                onChange={e => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="form-group-password">
              <label className="password-label" htmlFor="password">Password</label>
              <input type="password"
                className="form-input-password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}

              />
            </div>
            <div className="box-btn-login">
              <button type="submit"
                className="btn-login">
                Sign in
                </button>
            </div>
          </form>
          <Link className="link-to-signup" to="/signup">Don't have an account?</Link>
        </div>
      </div>
    </div>

  );
}

export default Login;
