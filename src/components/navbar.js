import React from "react";
import "../components/css/navbar.css";
import { NavLink } from "react-router-dom";
import "../App.css";

function Nav() {
  return (
      <nav className="navbarHeader" >
        <ul className="nav-links">
          
            <li><NavLink className="navStyle" exact to="/"  activeStyle={{color: "#8A56AC"}}>Dashboard</NavLink></li>
          
             <li className="nav-wall"></li>
         
            <li> <NavLink className="navStyle" to="/control"  activeStyle={{color: "#8A56AC"}}>Control </NavLink></li>
         
             <li className="nav-wall"></li>
         
            <li> <NavLink className="navStyle" to="/profile" activeStyle={{color: "#8A56AC"}}>Profile</NavLink></li>
          
        </ul>
      </nav>
  );
}
export default Nav;
