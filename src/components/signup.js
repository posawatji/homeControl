import React, { useState,useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../context/auth";
// import { register } from './UserFunctions'
import './css/signup.css';
// import Setting from "./setting" 

function Signup(props) {
  const [isRegister, setRegister] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setAuthTokens } = useAuth();

  // let register = () => {
  // //   //mock
  //   const user = {
  //     id:5,
  //     username: 'jame',
  //     email: 'email',
  //     password: 'password'
  //   }
  //   if(user.id <= 5){
  //     setAuthTokens(user)
  //     setRegister(true)
  //     console.log(user,"++testlimitperson")
  //   }else if(user.id >= 6){
  //     setAuthTokens("")
  //     setRegister(false)
  //     // console.log(user,"++testlimitperson")
  //     alert('user full')
  //   }
    
  // };


  useEffect(() => {
    overloadId()
    
  }, []);

  const [resgisOrder, setResgisOrder] = useState([]);
  const url1F1 = `http://watthomeapi.jp.ngrok.io/numberaccounts`;

  const overloadId = async () => {
    try {
      const res = await axios.get(url1F1);
      setResgisOrder(res.data);
      console.log(res.data)
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Cancel axios data source on error");
      } else {
        throw error;
      }
    }
  };



  function postSignup() { //connect to backend
    axios.post("http://watthomeapi.jp.ngrok.io/regis", {
      username,
      password,
      email
    }).then(result => {
      // let res = JSON.stringify(result.data)
      // let res = JSON.parse(result)
      // console.log(res,"++testlimitperson")

      if (result.status === 200) {
        setAuthTokens(result.data);
        setRegister(true);
        
      } else {
        setIsError(true);
        // alert("Account Full")
      }
    }).catch(e => {
      setIsError(true);
      alert("username or password not true")
    });
  }

  if (isRegister) {
    return <Redirect to="/signin" />;
  }
  
  // if (resgisOrder.id) {
  //   return <Redirect to="/" />;
  // }

  // let overid = resgisOrder.map(d => {
  //   console.log((d.id),"testtttt");
   
  // });
  // let overid = JSON.parse(resgisOrder);
  
  

  // if (overid[4]) {
  //   console.log(overid,"xxxxxxxxxxx")
  //   return <Redirect to="/signin" />;
  // }

  let overid = resgisOrder.map(d => parseInt(d.id), [])
  console.log(overid)

  let overidArr = overid[overid.length - 1];
  console.log(overidArr,"sssssssssssss")

  if (overidArr >= 4) {
      console.log(overidArr,"xxxxxxxxxxx")
      alert("user full")
      return <Redirect to="/signin" />;
    }

  return (
    <div className="container">
      <div className="box-register">
        <div className="register-form">
          <form noValidate onSubmit={e => {
            // setUser
            e.preventDefault()
           
            
            // register();
            postSignup();
          }}>

            <h1 className="register-tittle">Sign Up</h1>
            <div className="form-group-username">
              <label className="username-label"  htmlFor="first_name">Username</label>
              <input type="username"
                className="form-control"
                name="Username"
                placeholder="Enter Username"
                onChange={e => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className="form-group-password">
              <label className="password-label"htmlFor="email">Eamil</label>
              <input type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group-password">
              <label className="password-label" htmlFor="password">Password</label>
              <input type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button type="submit"
              className="btn-register">
              Register
            </button>
          </form>
          <Link className="link-to-login" to="/signin">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
