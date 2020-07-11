import React, {useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "../src/components/navbar";
import Dashboard from "./components/dashboard";
import Control from "./components/control";
import Profile from "./components/profile";
import {PrivateRoute} from './components/PrivateRoute';
import Login from './components/login'
import {AuthContext} from './context/auth'
import Singup from './components/signup'

function App() {
  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
    console.log(localStorage.setItem("tokens", JSON.stringify(data)))
    
  }

  // function Layout({children }) {
  //   return (
  //     <div>
  //        <div className="header">
  //             <Nav />
  //           </div >
  //           <div className="content">
  //             {children}
  //           </div>
  //     </div>
  //   )
  // }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens}}>
      <Router>
        <div className="App">
            <Switch>
              <PrivateRoute exact  path="/"  component={Dashboard} layout={true} />
              <PrivateRoute path="/control" component={Control}  layout={true} />
              <PrivateRoute path="/profile" component={Profile}  layout={true} />
              <Route path="/signin"  component={Login} />
              <Route path="/signup"  component={Singup} />
            </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
    
  );
}

export default App;
