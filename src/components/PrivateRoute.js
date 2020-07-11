import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";
import { useAuth } from "../context/auth";
import Nav from "./navbar";

export const PrivateRoute = ({ component: Component, layout, ...rest }) => {
    const { authTokens } = useAuth()
//   console.log(authTokens, localStorage.getItem('tokens'))
    return (
        <Route
            {...rest}
            render={props =>
                authTokens || localStorage.getItem('tokens') ? (
                    <>
                        {
                            layout ? (
                                <div>
                                    <div className="header">
                                        <Nav />
                                    </div >
                                    <div className="content">
                                        <Component {...props} />
                                    </div>
                                </div>
                            ) : <Component {...props} />
                        }
                    </>
                ) : (
                        <Redirect to="/signin" />
                    )
            }
        />
    );
}