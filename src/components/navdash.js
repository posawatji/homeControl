import React from "react";
import { NavLink } from "react-router-dom";
import "./css/navdash.css";
import './dashboard';


function NavDash() {
    return (
        <div className="dash-nav">
            <div className="bgDashNav">
                <ul className="nav-links-dash">
                    <li> 
                        <NavLink className="navhisDay" exact to={`/`}activeClassName={"navHisClickDay"}>
                            <text className="textDay">DAY</text> 
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className="navhisMonth" to={`/month`}activeClassName={"navHisClickMonth"}>
                            <text className="textMonth">MONTH</text> 
                        </NavLink>
                    </li>

                </ul>
            </div>
        </div>
    );
}
export default NavDash;
